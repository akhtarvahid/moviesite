import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel';
import axios from 'axios';
import { API_KEY, API_URL, IMAGE_BASE_URL, BACKDROP_SIZE } from '../../../config';
import HeroImage from './HeroImage/HeroImage';
import './herobanner.scss';

class HeroBanner extends Component {
    
    state = { upcommings: [], loading: false }
    componentDidMount() {
        if (sessionStorage.getItem('HeroBanner')) {
            let state = JSON.parse(sessionStorage.getItem('HeroBanner'));
            this.setState({ ...state })
          } else {
            this.setState({ loading: true })
            const endpoint = `${API_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
            this.fetchUpcoming(endpoint);
          }
    }
    fetchUpcoming(endpoint) {
        axios
        .get(endpoint)
        .then(res=> 
         this.setState({
            upcommings: res.data.results, 
            loading: false}, ()=> {
            sessionStorage.setItem('HeroBanner', JSON.stringify(this.state));
            })
        )
        .catch(err=> console.error('Error:', err))
    }
    
    render() { 
        console.log(this.state)
        const { upcommings } = this.state;
        return (  
            <div className="hero-banner">
               <Carousel showArrows={true} enableAutoPlay={true} 
                 autoPlaySpeed={4000} className="carousel-banner"
                 pagination={false} easing="ease-in-out"
                 tiltEasing="ease-in-out"
                 transitionMs={1500}>
                  {upcommings && upcommings.slice(4).map(heroImage => 
                    <HeroImage
                    key={heroImage.id}
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                    title={heroImage.original_title}
                    text={heroImage.overview}
                  />
                    )}
                </Carousel>
            </div>
        );
    }
} 

export default HeroBanner;
import React from 'react'
import axios from 'axios';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
import SearchBar from '../elements/searchBar/SearchBar';
import FourColGrid from '../elements/fourColGrid/FourColGrid';
import Spinner from '../elements/spinner/Spinner';
import LoadMoreBtn from '../elements/loadMoreBtn/LoadMoreBtn';
import MovieThumb from '../elements/movieThumb/MovieThumb';
import './home.scss';
import HeroBanner from '../elements/hero-banner/HeroBanner';

class Home extends React.Component {
    state={
        movies: [],
        heroImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm:''
    }
    componentDidMount() {
        if (sessionStorage.getItem('HomeState')) {
            let state = JSON.parse(sessionStorage.getItem('HomeState'))
            this.setState({ ...state })
          } else {
            this.setState({ loading: true })
            const endpoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
            this.fetchItems(endpoint);
          }
      }
    
      searchItems = (searchTerm) => {
        let endpoint = '';
        this.setState({
          movies: [],
          loading: true,
          searchTerm
        })
    
        if (searchTerm === "") {
          endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        } else {
          endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
        }
        this.fetchItems(endpoint);
      }
    
      loadMoreItems = () => {
        // ES6 Destructuring the state
        const { searchTerm, currentPage } = this.state;
    
        let endpoint = '';
        this.setState({ loading: true })
    
        if (searchTerm === '') {
          endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
        } else {
          endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
        }
        this.fetchItems(endpoint);
      }
    
      fetchItems = (endpoint) => {
        // ES6 Destructuring the state
        const { movies, heroImage, searchTerm } = this.state;
    
        axios(endpoint)
        .then(result => {
            console.log(result.data)
          this.setState({
            movies: [...movies, ...result.data.results],
            heroImage: heroImage || result.data.results[0],
            loading: false,
            currentPage: result.data.page,
            totalPages: result.data.total_pages
          }, () => {
            // Remember state for the next mount if we´re not in a search view
            if (searchTerm === "") {
              sessionStorage.setItem('HomeState', JSON.stringify(this.state));
            }
          })
        })
        .catch(error => console.error('Error:', error))
      }
    
      render() {
      const { movies, heroImage, loading, currentPage, totalPages, searchTerm } = this.state;
    
        return (
          <div className="rmdb-home">
            {heroImage ?
              <div>
                <HeroBanner />
                <SearchBar callback={this.searchItems}/>
              </div> : null }
              <div className="rmdb-home-grid">
                <FourColGrid
                  header={searchTerm ? 'Search Result' : 'Popular Movies'}
                  loading={loading}>
                  {movies.map( (element, i) => (
                    <MovieThumb
                      key={i}
                      clickable={true}
                      image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                      movieId={element.id}
                      movieName={element.original_name}
                    />
                  ))}
                </FourColGrid>
                {loading ? <Spinner /> : null}
                {(currentPage <= totalPages && !loading) ?
                  <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
                  : null
                }
              </div>
          </div>
        )
      }
    }
    
    export default Home;
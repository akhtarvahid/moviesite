import React from 'react';
import PropTypes from 'prop-types';
import './heroImage.scss';

const HeroImage = ({ image, title, text }) => (
  <div className="rmdb-heroimage"
    style={{
      background:
        `linear-gradient(to bottom, rgba(0,0,0,0)
        39%,rgba(0,0,0,0)
        41%,rgba(0,0,0,0.65)
        100%),
        url('${image}'), #1c1c1c`
    }}
  >
    <div className="rmdb-heroimage-content">
      <div className="rmdb-heroimage-text">
        <h1>{title}</h1>
        <p>{text && text.length > 200 ? text.slice(0, 200) + '...' : text }</p>
      </div>
    </div>
  </div>
)

HeroImage.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string
}

export default HeroImage;
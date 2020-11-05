import React from 'react';
import PropTypes from 'prop-types';
import './loadMoreBtn.scss';

const LoadMoreBtn = ({ text, onClick }) => (
  <div className="rmdb-loadmorebtn" onClick={onClick}>
    <button>{text}</button>
  </div>
)

LoadMoreBtn.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
}

export default LoadMoreBtn;
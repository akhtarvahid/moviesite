import React, { Component } from 'react'
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { BsSearch } from "react-icons/bs";

import './searchBar.scss';

class SearchBar extends Component {
  state = {
    value: ''
  }
  // Must have this here so we can reset it
  timeout = null;

  doSearch = (event) => {
    // ES6 Destructuring prop
    const { callback } = this.props;

    this.setState({ value: event.target.value })
    clearTimeout(this.timeout);
    // Set a timeout to wait for the user to stop writing
    // So we don´t have to make unnessesary calls
    this.timeout = setTimeout( () => {
      callback(this.state.value);
    }, 500);
  }

  render () {
    // ES6 Destructuring state
    const { value } = this.state;

    return (
      <div className="rmdb-searchbar">
         <input
            type="text"
            className="rmdb-searchbar-input"
            placeholder="Find your favourite"
            onChange={this.doSearch}
            value={value}
          />
           <BsSearch />
      </div>
    )
  }
}

SearchBar.propTypes = {
  callback: PropTypes.func
}

export default SearchBar;
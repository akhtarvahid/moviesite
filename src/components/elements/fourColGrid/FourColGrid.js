import React from 'react';
import PropTypes from 'prop-types';
import { MdMovie } from "react-icons/md";
import './fourColGrid.scss';

const FourColGrid = ({ header, loading, children }) => {

  return (
    <div className="rmdb-grid">
      {header && !loading ? <h2> <MdMovie /> {header}</h2> : null}
      <div className="rmdb-grid-content">
         {children.map( (element, i) => (
         <div key={i} className="rmdb-grid-element">
          {element}
         </div>
        ))}
      </div>
    </div>
  )
}

FourColGrid.propTypes = {
  header: PropTypes.string,
  loading: PropTypes.bool
}

export default FourColGrid;
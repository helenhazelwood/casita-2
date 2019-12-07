import React from 'react';
import plants from '../store/plants';

const PlantItem = props => {
  const { plant } = props;
  return (
    <div className="item-container">
      <div className="plant-image">
        <img src={plant.imageURL} />
      </div>
      <div className="item-text">
      <h3>{plant.name}</h3>
      <a>info</a>
      </div>
    </div>
  );
};

export default PlantItem;

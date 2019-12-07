import React from 'react';

const PlantItem = props => {
  const { plant } = props;
  return (
    <div className="item-container">
      <div>
        <img src={plant.imageURL} />
      </div>
    </div>
  );
};

export default PlantItem;

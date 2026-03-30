import React from 'react';
import { Link } from 'react-router-dom';

const PlantCard = ({ plant }) => {
  const imageUrl = plant.image 
    ? (plant.image.startsWith('http') ? plant.image : `${window.location.origin}${plant.image}`)
    : 'https://via.placeholder.com/200x200?text=No+Image';

  return (
    <Link to={`/plant/${plant.id}`} className="plant-card">
      <div className="plant-image-container">
        <img src={imageUrl} alt={plant.name} className="plant-image" />
      </div>
      <div className="plant-info">
        <h3 className="plant-name">{plant.name}</h3>
        <p className="plant-price">{(plant.price || 0).toLocaleString()} VNĐ</p>
      </div>
    </Link>
  );
};

export default PlantCard;

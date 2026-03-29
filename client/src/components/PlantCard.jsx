import React from 'react';
import { Link } from 'react-router-dom';

const PlantCard = ({ plant }) => {
  const imageUrl = plant.image 
    ? (plant.image.startsWith('http') ? plant.image : `http://localhost:5001${plant.image}`)
    : 'https://via.placeholder.com/300x250?text=No+Image';

  return (
    <Link to={`/plant/${plant.id}`} className="plant-card">
      <img src={imageUrl} alt={plant.name} className="plant-image" />
      <div className="plant-info">
        <h3 className="plant-name">{plant.name}</h3>
        <p className="plant-price">{plant.price.toLocaleString()} VNĐ</p>
      </div>
    </Link>
  );
};

export default PlantCard;

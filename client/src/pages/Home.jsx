import React, { useState, useEffect } from 'react';
import { getPlants } from '../api';
import PlantCard from '../components/PlantCard';

const Home = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const { data } = await getPlants();
      setPlants(data);
    } catch (error) {
      console.error('Error fetching plants:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', marginBottom: '10px' }}>
          Discover the Perfect Greenery
        </h1>
        <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
          Transform your space with our curated collection of indoor and outdoor plants.
        </p>
      </header>

      <div style={{ marginBottom: '30px', maxWidth: '500px', margin: '0 auto 40px' }}>
        <input 
          type="text" 
          placeholder="Search for plants..." 
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading plants...</p>
      ) : (
        <div className="plant-grid">
          {filteredPlants.map(plant => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      )}

      {!loading && filteredPlants.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '40px' }}>No plants found matching your search.</p>
      )}
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { getPlants } from '../api';
import PlantCard from '../components/PlantCard';
import bgHeader from '../assets/bg_header.png';

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
      setPlants(data || []);
    } catch (error) {
      console.error('Error fetching plants:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlants = plants.filter(plant =>
    (plant?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <section className="hero" style={{ backgroundImage: `url(${bgHeader})` }}>
        <div className="container">
          <h1 className="hero-brand">BINHAN</h1>
          <p className="hero-subtitle">
            Mang thiên nhiên vào không gian sống của bạn
          </p>
          <div className="hero-search">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <main className="container">
        {loading ? (
          <p style={{ textAlign: 'center', padding: '100px 0' }}>Đang tải dữ liệu...</p>
        ) : (
          <div className="plant-grid">
            {filteredPlants.map(plant => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        )}

        {!loading && filteredPlants.length === 0 && (
          <p style={{ textAlign: 'center', padding: '100px 0' }}>Không tìm thấy cây cảnh nào phù hợp.</p>
        )}
      </main>
    </div>
  );
};

export default Home;

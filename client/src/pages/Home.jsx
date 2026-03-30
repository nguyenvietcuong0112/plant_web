import React, { useState, useEffect } from 'react';
import { getPlants } from '../api';
import PlantCard from '../components/PlantCard';

const Home = () => {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchPlants();
  }, []);

  const filteredPlants = plants.filter(plant =>
    plant?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <section className="hero" style={{ padding: '60px 0 20px', textAlign: 'center' }}>
        <h1 className="section-title">Khám phá Thế giới Cây cảnh</h1>
        <p className="section-subtitle">Mang thiên nhiên vào không gian sống của bạn với bộ sưu tập cây cảnh độc đáo và đa dạng.</p>
        
        <div className="search-container" style={{ maxWidth: '600px', margin: '40px auto 0' }}>
          <span style={{ fontSize: '1.2rem' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Tìm kiếm cây cảnh (ví dụ: Sen đá, Xương rồng...)" 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      <section>
        {loading ? (
          <p style={{ textAlign: 'center', padding: '100px' }}>Đang tải dữ liệu...</p>
        ) : (
          <div className="plant-grid">
            {filteredPlants.map(plant => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        )}
        
        {!loading && filteredPlants.length === 0 && (
          <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>
            <p>Không tìm thấy cây cảnh nào phù hợp với tìm kiếm của bạn.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;

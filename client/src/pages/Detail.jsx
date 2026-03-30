import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlantById } from '../api';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const { data } = await getPlantById(id);
        setPlant(data);
      } catch (error) {
        console.error('Error fetching plant:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [id]);

  if (loading) return <div className="container" style={{ padding: '100px', textAlign: 'center' }}>Đang tải thông tin...</div>;
  if (!plant) return <div className="container" style={{ padding: '100px', textAlign: 'center' }}>Không tìm thấy sản phẩm.</div>;

  const imageUrl = plant.image 
    ? (plant.image.startsWith('http') ? plant.image : `http://localhost:5001${plant.image}`)
    : 'https://via.placeholder.com/600x400?text=No+Image';

  return (
    <div className="container" style={{ padding: '60px 20px' }}>
      <button onClick={() => navigate(-1)} className="btn" style={{ marginBottom: '30px', background: 'transparent', color: 'var(--primary)', padding: '0', display: 'flex', alignItems: 'center', gap: '8px' }}>
        ← Quay lại
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '50px', alignItems: 'start' }}>
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
          <img src={imageUrl} alt={plant.name} style={{ width: '100%', display: 'block' }} />
        </div>
        
        <div className="plant-detail-info">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{plant.name}</h1>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '25px' }}>
            {plant.price.toLocaleString()} VNĐ
          </p>
          
          <div style={{ height: '2px', background: '#f1f5f9', marginBottom: '25px' }}></div>
          
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '10px', fontSize: '1.1rem' }}>Mô tả sản phẩm</h3>
            <p style={{ color: 'var(--text-base)', whiteSpace: 'pre-wrap', fontSize: '1.05rem' }}>{plant.description}</p>
          </div>
          <button className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
            Add to Library
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;

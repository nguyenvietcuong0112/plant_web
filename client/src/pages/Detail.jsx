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

  if (loading) return <div className="container" style={{ padding: '40px' }}>Đang tải...</div>;
  if (!plant) return <div className="container" style={{ padding: '40px' }}>Không tìm thấy sản phẩm.</div>;

  const imageUrl = plant.image 
    ? (plant.image.startsWith('http') ? plant.image : `http://localhost:5001${plant.image}`)
    : 'https://via.placeholder.com/600x400?text=No+Image';

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <button 
        onClick={() => navigate(-1)} 
        className="btn" 
        style={{ marginBottom: '30px', background: '#eee' }}
      >
        ← Quay lại
      </button>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', alignItems: 'start' }}>
        <img 
          src={imageUrl} 
          alt={plant.name} 
          style={{ width: '100%', borderRadius: '20px', boxShadow: 'var(--shadow)', maxHeight: '500px', objectFit: 'cover' }} 
        />
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{plant.name}</h1>
          <p style={{ fontSize: '1.5rem', color: 'var(--primary-color)', fontWeight: '700', marginBottom: '20px' }}>
            {(plant.price || 0).toLocaleString()} VNĐ
          </p>
          <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '12px', marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '10px' }}>Mô tả sản phẩm</h3>
            <p style={{ color: 'var(--text-light)', whiteSpace: 'pre-wrap' }}>{plant.description}</p>
          </div>
          <button className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
            Liên hệ đặt mua
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;

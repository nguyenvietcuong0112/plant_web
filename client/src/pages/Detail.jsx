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
    ? (plant.image.startsWith('http') ? plant.image : `${window.location.origin}${plant.image}`)
    : 'https://via.placeholder.com/800x600?text=No+Image';

  return (
    <div className="detail-page container">
      <header className="detail-header">
        <button onClick={() => navigate(-1)} className="btn-back">
          <span style={{ fontSize: '1.4rem' }}>◀</span> Trở về
        </button>
      </header>

      <div className="detail-layout">
        <div className="detail-image-box">
          <img src={imageUrl} alt={plant.name} />
        </div>

        <div className="detail-card">
          <h1 className="detail-title">{plant.name}</h1>
          <div className="detail-price-row">
            <p className="detail-price">
              {Math.floor(plant.price).toLocaleString()} VNĐ
            </p>
            <a href="https://zalo.me/0969385426" target="_blank" rel="noopener noreferrer" className="btn-contact">
              Liên hệ ngay
            </a>
          </div>
          <div className="detail-desc">
            {plant.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

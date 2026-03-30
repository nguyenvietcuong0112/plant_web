import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlants, createPlant, updatePlant, deletePlant } from '../api';

const Admin = () => {
  const [plants, setPlants] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('supabase.auth.token');
    navigate('/login');
  };

  const fetchPlants = async () => {
    try {
      const { data } = await getPlants();
      setPlants(data);
    } catch (error) {
      console.error('Error fetching plants:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editingId) {
        await updatePlant(editingId, data);
        alert('Cập nhật thành công!');
      } else {
        await createPlant(data);
        alert('Thêm cây mới thành công!');
      }
      setFormData({ name: '', price: '', description: '', image: null });
      setEditingId(null);
      fetchPlants();
    } catch (error) {
      console.error('Error saving plant:', error);
      const errorMsg = error.response?.data?.error || 'Có lỗi xảy ra!';
      alert('Lỗi: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plant) => {
    setEditingId(plant.id);
    setFormData({
      name: plant.name,
      price: plant.price,
      description: plant.description,
      image: null
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa cây này?')) {
      try {
        await deletePlant(id);
        fetchPlants();
      } catch (error) {
        alert('Lỗi khi xóa: ' + (error.response?.data?.error || 'Có lỗi xảy ra'));
      }
    }
  };

  return (
    <div className="container" style={{ padding: '60px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Quản lý Sản phẩm</h1>
          <p style={{ color: 'var(--text-muted)' }}>Thêm, sửa hoặc xóa cây cảnh trong kho hàng của bạn.</p>
        </div>
        <button onClick={handleLogout} className="btn btn-danger">Đăng xuất</button>
      </div>

      <div className="admin-card" style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '1.25rem' }}>
          {editingId ? '📝 Cập nhật thông tin cây' : '✨ Thêm cây cảnh mới'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <div className="form-group">
              <label>Tên cây cảnh</label>
              <input type="text" name="name" className="form-control" placeholder="Ví dụ: Sen đá móng rồng" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Giá bán (VNĐ)</label>
              <input type="number" name="price" className="form-control" placeholder="150000" value={formData.price} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="form-group">
            <label>Mô tả chi tiết</label>
            <textarea name="description" className="form-control" rows="4" placeholder="Nhập đặc điểm, cách chăm sóc..." value={formData.description} onChange={handleChange}></textarea>
          </div>
          
          <div className="form-group">
            <label>Hình ảnh sản phẩm</label>
            <input type="file" name="image" className="form-control" onChange={handleChange} accept="image/*" />
            {editingId && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>* Để trống nếu không muốn đổi ảnh cũ</p>}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '14px 40px' }} disabled={loading}>
              {loading ? 'Đang lưu...' : (editingId ? 'Cập nhật ngay' : 'Thêm vào kho')}
            </button>
            {editingId && (
              <button type="button" className="btn" style={{ background: '#f1f5f9', color: 'var(--text-base)' }} onClick={() => {
                setEditingId(null);
                setFormData({ name: '', price: '', description: '', image: null });
              }}>Hủy bỏ</button>
            )}
          </div>
        </form>
      </div>

      <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Danh sách sản phẩm ({plants.length})</h2>
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá niêm yết</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {plants.map(plant => (
              <tr key={plant.id}>
                <td style={{ width: '100px' }}>
                  <img 
                    src={plant.image ? (plant.image.startsWith('http') ? plant.image : `http://localhost:5001${plant.image}`) : 'https://via.placeholder.com/600x400?text=No+Image'} 
                    alt={plant.name} 
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </td>
                <td style={{ fontWeight: '600', color: 'var(--text-dark)' }}>{plant.name}</td>
                <td style={{ color: 'var(--primary)', fontWeight: '700' }}>{plant.price.toLocaleString()} đ</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn" style={{ background: '#f0fdf4', color: 'var(--primary)', padding: '8px 16px' }} onClick={() => handleEdit(plant)}>Sửa</button>
                    <button className="btn btn-danger" style={{ padding: '8px 16px' }} onClick={() => handleDelete(plant.id)}>Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;

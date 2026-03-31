import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlants, createPlant, updatePlant, deletePlant } from '../api';

const Admin = () => {
  const [plants, setPlants] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null
  });

  useEffect(() => {
    fetchPlants();
  }, []);

  const navigate = useNavigate();

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
      if (!error.response) {
        alert('Lỗi kết nối: Không thể kết nối tới Server (cổng 5000). Hãy chắc chắn bạn đã chạy "npm start"!');
      } else {
        const errBody = error.response?.data?.error;
        const errorMsg = typeof errBody === 'object' ? JSON.stringify(errBody) : (errBody || 'Có lỗi xảy ra tại Server!');
        alert('Lỗi Server: ' + errorMsg);
      }
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
        console.error('Error deleting plant:', error);
      }
    }
  };

  return (
  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Quản lý sản phẩm</h1>
            <p className="admin-subtitle">Hệ thống quản trị Tiệm Cây Bình An</p>
          </div>
          <button onClick={handleLogout} className="btn-logout">Đăng xuất</button>
        </div>

        <div className="admin-card">
          <h2 className="card-title">{editingId ? 'Sửa thông tin cây' : 'Thêm cây mới'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Tên cây</label>
                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} placeholder="Ví dụ: Cây Kim Tiền" required />
              </div>
              <div className="form-group">
                <label>Giá (VNĐ)</label>
                <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} placeholder="150000" required />
              </div>
            </div>
            
            <div className="form-group">
              <label>Mô tả sản phẩm</label>
              <textarea name="description" className="form-control" rows="3" value={formData.description} onChange={handleChange} placeholder="Mô tả đặc điểm, ý nghĩa và cách chăm sóc..."></textarea>
            </div>

            <div className="form-group">
              <label>Hình ảnh sản phẩm</label>
              <input type="file" name="image" className="form-control" onChange={handleChange} />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Lưu thay đổi' : 'Thêm sản phẩm mới'}
              </button>
              {editingId && (
                <button type="button" className="btn-cancel" onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', price: '', description: '', image: null });
                }}>Hủy</button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-list-section">
          <h2 className="section-title-left">Danh sách sản phẩm ({plants.length})</h2>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Thông tin sản phẩm</th>
                  <th>Giá tiền</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {plants.map(plant => (
                  <tr key={plant.id}>
                    <td>
                      <div className="admin-thumb">
                        <img src={plant.image ? (plant.image.startsWith('http') ? plant.image : plant.image) : 'https://via.placeholder.com/80'} alt={plant.name} />
                      </div>
                    </td>
                    <td>
                      <div className="admin-plant-info">
                        <strong>{plant.name}</strong>
                        <p className="admin-plant-desc">{plant.description?.substring(0, 60)}...</p>
                      </div>
                    </td>
                    <td><span className="admin-price">{(plant.price || 0).toLocaleString()} VNĐ</span></td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn-edit" onClick={() => handleEdit(plant)}>Sửa</button>
                        <button className="btn-delete" onClick={() => handleDelete(plant.id)}>Xóa</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
  );
};

export default Admin;

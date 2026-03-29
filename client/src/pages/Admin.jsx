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
        const errorMsg = error.response?.data?.error || 'Có lỗi xảy ra tại Server!';
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
    <div className="container admin-page" style={{ padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Quản lý sản phẩm</h1>
        <button onClick={handleLogout} className="btn" style={{ backgroundColor: '#ff4d4d', color: 'white' }}>Đăng xuất</button>
      </div>

      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: 'var(--shadow)', marginBottom: '50px', marginTop: '30px' }}>
        <h2>{editingId ? 'Sửa thông tin cây' : 'Thêm cây mới'}</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div className="form-group">
            <label>Tên cây</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Giá (VNĐ)</label>
            <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Mô tả</label>
            <textarea name="description" className="form-control" rows="4" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label>Hình ảnh</label>
            <input type="file" name="image" className="form-control" onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Cập nhật' : 'Thêm mới'}
          </button>
          {editingId && (
            <button type="button" className="btn" style={{ marginLeft: '10px', background: '#ccc' }} onClick={() => {
              setEditingId(null);
              setFormData({ name: '', price: '', description: '', image: null });
            }}>Hủy</button>
          )}
        </form>
      </div>

      <h2>Danh sách cây</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {plants.map(plant => (
            <tr key={plant.id}>
              <td>
                <img src={plant.image ? (plant.image.startsWith('http') ? plant.image : `http://localhost:5001${plant.image}`) : 'https://via.placeholder.com/50'} alt={plant.name} />
              </td>
              <td>{plant.name}</td>
              <td>{plant.price.toLocaleString()} VNĐ</td>
              <td>
                <button className="btn btn-primary" style={{ marginRight: '10px', padding: '5px 15px' }} onClick={() => handleEdit(plant)}>Sửa</button>
                <button className="btn btn-danger" style={{ padding: '5px 15px' }} onClick={() => handleDelete(plant.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;

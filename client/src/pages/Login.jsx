import React, { useState } from 'react';
import { supabase } from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      localStorage.setItem('supabase.auth.token', data.session.access_token);
      navigate('/admin');
    } catch (error) {
      alert('Lỗi đăng nhập: ' + (error.message || 'Sai email hoặc mật khẩu'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)' }}>
      <div className="admin-card" style={{ width: '100%', maxWidth: '450px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔐</div>
        <h1 style={{ marginBottom: '10px' }}>Đăng nhập Quản trị</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Vui lòng đăng nhập để quản lý kho hàng của bạn.</p>
        
        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          <div className="form-group">
            <label>Email đại diện</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="admin@example.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px', padding: '14px' }} disabled={loading}>
            {loading ? 'Đang xác thực...' : 'Đăng nhập ngay'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

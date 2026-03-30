import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Khởi tạo Supabase client trực tiếp tại đây để tránh lỗi import
const supabaseUrl = 'https://zqiipqdvagiihvbyshrc.supabase.co';
const supabaseKey = 'sb_publishable_CPsWTZQUkOC-7cToD2Hq3w_mgf8U9AM'; // Lưu ý: Key này cần kiểm tra lại nếu không chạy được
const supabase = createClient(supabaseUrl, supabaseKey);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Lưu token vào localStorage
      localStorage.setItem('supabase.auth.token', data.session.access_token);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Lỗi đăng nhập: Sai email hoặc mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', padding: '100px 20px' }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Đăng nhập Quản trị</h2>
        {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>Mật khẩu</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '20px' }}
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

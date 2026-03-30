import React from 'react';

const Contact = () => {
  return (
    <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', marginBottom: '30px' }}>
        Liên hệ với chúng tôi
      </h1>
      
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '12px', boxShadow: 'var(--shadow)', textAlign: 'left' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>📍 Địa chỉ</h3>
          <p>123 Đường Cây Cảnh, Quận X, TP. Hồ Chí Minh</p>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>📞 Điện thoại</h3>
          <p>0123 456 789</p>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>✉️ Email</h3>
          <p>contact@plantshop.vn</p>
        </div>
        
        <div style={{ marginTop: '30px', padding: '20px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #dcfce7' }}>
          <p style={{ fontStyle: 'italic', color: '#166534' }}>
            "Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn tìm kiếm người bạn xanh cho ngôi nhà của mình."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

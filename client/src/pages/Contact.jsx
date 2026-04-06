import React from 'react';

const Contact = () => {
  return (
    <div className="contact-page-container">
      <h1 className="contact-title">Liên hệ với chúng tôi</h1>
      
      <div className="contact-main-card">
        <div className="contact-method-item">
          <div className="method-icon">📞</div>
          <div className="method-content">
            <h3>Điện thoại</h3>
            <p>0969 385 426</p>
          </div>
        </div>
        
        <div className="contact-method-item">
          <div className="method-icon">✉️</div>
          <div className="method-content">
            <h3>Email</h3>
            <p>tiemcaycanhbinhan@gmail.com</p>
          </div>
        </div>

        <div className="contact-method-item">
          <div className="method-icon">💬</div>
          <div className="method-content">
            <h3>Zalo</h3>
            <a href="https://zalo.me/0969385426" target="_blank" rel="noopener noreferrer" className="contact-button zalo">
              Nhắn tin Zalo
            </a>
          </div>
        </div>

        <div className="contact-method-item">
          <div className="method-icon">📸</div>
          <div className="method-content">
            <h3>Instagram</h3>
            <a href="https://www.instagram.com/tiemcaybinhann?igsh=MTRyeGZrb3Vib2FuOQ==" target="_blank" rel="noopener noreferrer" className="contact-button insta">
              Liên hệ ngay
            </a>
          </div>
        </div>
        
        <div className="contact-quote-box">
          <p>
            "Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn tìm kiếm người bạn xanh cho ngôi nhà của mình."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

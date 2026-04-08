import React from 'react';

const Contact = () => {
  return (
    <div className="contact-page-container">
      <h1 className="contact-title">Liên hệ với chúng tôi</h1>

      <div className="contact-main-card">
        <div className="contact-method-item">
          <div className="method-icon phone">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div className="method-content">
            <h3>Điện thoại</h3>
            <p>0969 385 426</p>
          </div>
        </div>

        <div className="contact-method-item">
          <div className="method-icon email">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </div>
          <div className="method-content">
            <h3>Email</h3>
            <p>tiemcaycanhbinhan@gmail.com</p>
          </div>
        </div>

        <div className="contact-method-item">
          <div className="method-icon zalo">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </div>
          <div className="method-content">
            <h3>Zalo</h3>
            <a href="https://zalo.me/0969385426" target="_blank" rel="noopener noreferrer" className="contact-button zalo">
              Nhắn tin Zalo
            </a>
          </div>
        </div>

        <div className="contact-method-item">
          <div className="method-icon instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </div>
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

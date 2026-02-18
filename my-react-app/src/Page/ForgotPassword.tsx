import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleReset = () => {
    alert("ระบบได้ส่งลิงก์ไปที่อีเมลของคุณแล้ว");
    navigate('/login');
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ fontSize: '50px', marginBottom: '15px' }}>🔓</div>
        <h2 style={{ marginBottom: '10px' }}>ลืมรหัสผ่าน?</h2>
        <p style={{ fontSize: '14px', color: '#777', marginBottom: '25px' }}>กรอกอีเมลของคุณเพื่อกู้คืน</p>
        <input type="email" placeholder="ระบุอีเมลของคุณ" style={inputStyle} />
        <button onClick={handleReset} style={buttonStyle}>ส่งลิงก์กู้คืน</button>
        <div style={footerStyle}>
          <Link to="/login" style={linkStyle}>← กลับไปหน้าเข้าสู่ระบบ</Link>
        </div>
      </div>
    </div>
  );
};

// --- Styles ---
const containerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' };
const cardStyle: React.CSSProperties = { width: '100%', maxWidth: '380px', padding: '40px', backgroundColor: '#fff', borderRadius: '24px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', textAlign: 'center' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '14px', marginBottom: '15px', borderRadius: '12px', border: '1px solid #eee', fontSize: '15px', boxSizing: 'border-box' };
const buttonStyle: React.CSSProperties = { width: '100%', padding: '14px', backgroundColor: '#9b67bd', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' };
const footerStyle: React.CSSProperties = { marginTop: '25px', fontSize: '14px' };
const linkStyle: React.CSSProperties = { color: '#666', textDecoration: 'none' };

export default ForgotPassword;
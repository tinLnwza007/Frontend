import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // พอกดปุ่ม Login ให้วาร์ปไปหน้าหลักทันที
    navigate('/home'); 
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={logoStyle}>READTIME ✎</h1>
        <h2 style={titleStyle}>เข้าสู่ระบบ</h2>
        
        <div style={inputGroup}>
          <input 
            type="email" 
            placeholder="อีเมล" 
            style={inputStyle} 
            autoComplete="off" // ป้องกันการกรอกอัตโนมัติ
          />
          <input 
            type="password" 
            placeholder="รหัสผ่าน" 
            style={inputStyle} 
            autoComplete="new-password"
          />
        </div>

        <button onClick={handleLogin} style={buttonStyle}>
          Log in
        </button>

        <div style={footerStyle}>
          <Link to="/register" style={linkStyle}>สมัครสมาชิกใหม่</Link>
          <span style={{ margin: '0 10px', color: '#ccc' }}>|</span>
          <Link to="/forgot-password" style={linkStyle}>ลืมรหัสผ่าน?</Link>
        </div>
      </div>
    </div>
  );
};

// Styles 
const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  fontFamily: "'Kanit', sans-serif",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '40px',
  borderRadius: '20px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '380px',
  textAlign: 'center',
};

const logoStyle: React.CSSProperties = {
  fontSize: '32px',
  color: '#9b67bd',
  margin: '0 0 10px 0',
  fontWeight: 'bold',
};

const titleStyle: React.CSSProperties = {
  color: '#333',
  fontSize: '18px',
  marginBottom: '30px',
  fontWeight: 500,
};

const inputGroup: React.CSSProperties = {
  marginBottom: '20px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 15px',
  margin: '8px 0',
  borderRadius: '10px',
  border: '1px solid #ddd',
  fontSize: '16px',
  boxSizing: 'border-box',
  fontFamily: "'Kanit', sans-serif", 
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#9b67bd',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: '0.3s',
  fontFamily: "'Kanit', sans-serif",
};

const footerStyle: React.CSSProperties = {
  marginTop: '25px',
  fontSize: '14px',
};

const linkStyle: React.CSSProperties = {
  color: '#9b67bd',
  textDecoration: 'none',
  fontWeight: 500,
};

export default Login;
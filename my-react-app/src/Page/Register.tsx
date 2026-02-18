import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    // พอกดปุ่มสมัครสมาชิก ให้วาร์ปไปหน้าหลักทันที
    navigate('/home'); 
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={logoStyle}>READTIME ✎</h1>
        <h2 style={titleStyle}>สร้างบัญชีใหม่</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <input type="text" placeholder="ชื่อผู้ใช้" style={inputStyle} autoComplete="off" />
          <input type="email" placeholder="อีเมล" style={inputStyle} autoComplete="off" />
          <input type="password" placeholder="รหัสผ่าน" style={inputStyle} autoComplete="new-password" />
          <input type="password" placeholder="ยืนยันรหัสผ่าน" style={inputStyle} autoComplete="new-password" />
        </div>

        <button onClick={handleSignUp} style={buttonStyle}>
          Sign Up & Start Reading
        </button>

        <div style={footerStyle}>
          <span style={{ color: '#666' }}>มีบัญชีอยู่แล้ว? </span>
          <Link to="/login" style={linkStyle}>เข้าสู่ระบบ</Link>
        </div>
      </div>
    </div>
  );
};

// --- Styles (ฟอนต์ Kanit) ---
const containerStyle: React.CSSProperties = {
  display: 'flex', justifyContent: 'center', alignItems: 'center', 
  height: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #d6e4ff 100%)',
  fontFamily: "'Kanit', sans-serif"
};
const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff', padding: '40px', borderRadius: '24px', 
  boxShadow: '0 15px 35px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center'
};
const logoStyle: React.CSSProperties = { fontSize: '32px', color: '#9b67bd', margin: '0 0 10px 0', fontWeight: 'bold' };
const titleStyle: React.CSSProperties = { fontSize: '18px', marginBottom: '25px', color: '#444', fontWeight: 500 };
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px', margin: '8px 0', borderRadius: '12px', 
  border: '1px solid #eee', fontSize: '15px', boxSizing: 'border-box', 
  backgroundColor: '#fafafa', fontFamily: "'Kanit', sans-serif"
};
const buttonStyle: React.CSSProperties = {
  width: '100%', padding: '14px', backgroundColor: '#9b67bd', color: 'white', 
  border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', 
  cursor: 'pointer', marginTop: '10px', fontFamily: "'Kanit', sans-serif"
};
const footerStyle: React.CSSProperties = { marginTop: '25px', fontSize: '14px' };
const linkStyle: React.CSSProperties = { color: '#9b67bd', textDecoration: 'none', fontWeight: '500' };

export default Register;
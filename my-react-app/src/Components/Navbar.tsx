import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Pencil, User, BookOpen, Settings, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [showNoti, setShowNoti] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setShowProfile(false);
    setShowNoti(false);
  };

  return (
    <nav style={navbarStyle}>
      <div style={navInner}>
        {/* ส่วนซ้าย: Home Group + Logo */}
        <div style={navLeftSide}>
          <div 
            style={logoContainer} 
            onClick={() => handleNavigate('/home')}
          >
            {/* ไอคอน Home + หน้าหลัก */}
            <div style={homeGroup}>
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                style={{ width: '28px', height: '28px', color: '#333' }}
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span style={homeText}>หน้าหลัก</span>
            </div>
            
            {/* ชื่อparty */}
            <h1 style={logoStyle}>READTIME</h1>
          </div>

          <div style={menuTabs}>
            {/* Tab ว่างๆ  */}
            <span style={navTab} onClick={() => handleNavigate('/home')}></span>
          </div>
        </div>
        
        {/* Search Bar */}
        <div style={searchContainer}>
          <Search size={18} style={searchIconInside} />
          <input type="text" placeholder="ค้นหานิยาย การ์ตูน..." style={searchInput} />
        </div>
        
        {/* Icons */}
        <div style={navRightSide}>
          <div style={{ position: 'relative' }}>
            <div style={iconBadge} onClick={() => { setShowNoti(!showNoti); setShowProfile(false); }}>
              <Bell size={22} strokeWidth={1.5} />
              <div style={redDot}></div>
            </div>

            {showNoti && (
              <div style={notiDropdown}>
                <div style={dropdownHeader}>การแจ้งเตือน</div>
                <div style={notiItem}>
                  <div style={notiCircle}></div>
                  <div style={notiTextGroup}>
                    <p style={notiMainText}><b>ไอไอซ์ตื่นแล้ว</b> บอสตื่นแล้ว!</p>
                    <p style={notiSubText}>เมื่อ 2 นาทีที่แล้ว</p>
                  </div>
                </div>
                <div style={dropdownFooter} onClick={() => setShowNoti(false)}>ดูทั้งหมด</div>
              </div>
            )}
          </div>
          
          <div style={iconBadge} onClick={() => handleNavigate('/writing')}>
            <Pencil size={22} strokeWidth={1.5} />
          </div>
          
          <div style={{ position: 'relative' }}>
            <div style={avatarWrapper} onClick={() => { setShowProfile(!showProfile); setShowNoti(false); }}>
              <User size={20} color="#fff" />
            </div>

            {showProfile && (
              <div style={profileDropdown}>
                <div style={profileHeader}>
                  <div style={profileImgCircle}><User size={18} color="#fff" /></div>
                  <span style={profileNameText}>Susu</span>
                </div>
                <div style={divider}></div>
                <div style={menuItem} onClick={() => handleNavigate('/writing')}>
                  <Pencil size={18} color="#666" /> My Writing
                </div>
                <div style={menuItem} onClick={() => handleNavigate('/my-reading')}>
                  <BookOpen size={18} color="#666" /> My Reading
                </div>
                <div style={menuItem} onClick={() => handleNavigate('/profile')}>
                  <Settings size={18} color="#666" /> My Profile
                </div>
                <div style={divider}></div>
                <div style={logoutBtn} onClick={() => handleNavigate('/login')}>
                  <LogOut size={18} /> ออกจากระบบ
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Styles 
const logoContainer: React.CSSProperties = { 
  display: 'flex', 
  alignItems: 'center', 
  gap: '20px', 
  cursor: 'pointer' 
};

const homeGroup: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2px'
};

const homeText: React.CSSProperties = {
  fontSize: '14px',
  color: '#9b67bd',
  fontWeight: '500',
  marginTop: '-2px'
};

const logoStyle: React.CSSProperties = { 
  color: '#9b67bd', 
  fontSize: '38px', 
  fontWeight: 900, 
  letterSpacing: '-1px', 
  textTransform: 'uppercase', 
  margin: 0, 
  fontFamily: 'Arial Black, sans-serif' 
};

//Styles 
const navbarStyle: React.CSSProperties = { padding: '12px 0', borderBottom: '1px solid #f3f3f3', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 1000 };
const navInner: React.CSSProperties = { maxWidth: '1700px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 30px' };
const navLeftSide: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '40px', flexShrink: 0 };
const searchContainer: React.CSSProperties = { position: 'relative', flex: 1, maxWidth: '600px', marginRight: '100px', marginLeft: '20px' };
const searchIconInside: React.CSSProperties = { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' };
const searchInput: React.CSSProperties = { width: '100%', padding: '10px 45px', borderRadius: '25px', border: 'none', backgroundColor: '#f5f5f5', fontSize: '15px', outline: 'none' };
const navRightSide: React.CSSProperties = { display: 'flex', gap: '15px', alignItems: 'center', flexShrink: 0 };
const menuTabs: React.CSSProperties = { display: 'flex', gap: '25px' };
const navTab: React.CSSProperties = { color: '#9b67bd', fontSize: '18px', cursor: 'pointer' };
const iconBadge: React.CSSProperties = { position: 'relative', cursor: 'pointer', padding: '8px' };
const redDot: React.CSSProperties = { position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', backgroundColor: 'red', borderRadius: '50%', border: '2px solid white' };
const avatarWrapper: React.CSSProperties = { width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#9b67bd', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' };
const notiDropdown: React.CSSProperties = { position: 'absolute', top: '50px', right: '-10px', width: '280px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 2000, overflow: 'hidden', border: '1px solid #f0f0f0' };
const dropdownHeader: React.CSSProperties = { padding: '12px 15px', fontWeight: 'bold', fontSize: '14px', borderBottom: '1px solid #f5f5f5', color: '#333' };
const notiItem: React.CSSProperties = { display: 'flex', padding: '12px 15px', gap: '12px', cursor: 'pointer', borderBottom: '1px solid #fafafa' };
const notiCircle: React.CSSProperties = { width: '8px', height: '8px', backgroundColor: '#9b67bd', borderRadius: '50%', marginTop: '6px', flexShrink: 0 };
const notiTextGroup: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '2px' };
const notiMainText: React.CSSProperties = { margin: 0, fontSize: '13px', color: '#444', lineHeight: '1.4' };
const notiSubText: React.CSSProperties = { margin: 0, fontSize: '11px', color: '#aaa' };
const dropdownFooter: React.CSSProperties = { padding: '10px', textAlign: 'center', fontSize: '12px', color: '#9b67bd', cursor: 'pointer', fontWeight: '500' };
const profileDropdown: React.CSSProperties = { position: 'absolute', top: '50px', right: '0', width: '220px', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', zIndex: 2000, overflow: 'hidden', border: '1px solid #f0f0f0' };
const profileHeader: React.CSSProperties = { display: 'flex', alignItems: 'center', padding: '15px', gap: '12px' };
const profileImgCircle: React.CSSProperties = { width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#9b67bd', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const profileNameText: React.CSSProperties = { fontSize: '18px', color: '#9b67bd', fontWeight: 'bold' };
const divider: React.CSSProperties = { height: '1px', backgroundColor: '#f0f0f0' };
const menuItem: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', color: '#333', cursor: 'pointer', fontSize: '15px' };
const logoutBtn: React.CSSProperties = { padding: '15px', textAlign: 'center', color: '#ff4d4f', fontWeight: 'bold', cursor: 'pointer' };

export default Navbar;
import React, { useState } from 'react';
import { Camera } from 'lucide-react'; 

const Profile = () => {
  // 1. State หลักที่ใช้แสดงผลจริงบนหน้าเว็บ
  const [username, setUsername] = useState('Susu');
  const [showEditMenu, setShowEditMenu] = useState(false);

  // 2. State สำรอง สำหรับพักค่าที่กำลังพิมพ์ใน Input
  const [tempUsername, setTempUsername] = useState('Susu');

  // ฟังก์ชัน: เมื่อกดปุ่มแก้ไข (ดึงชื่อปัจจุบันไปรอไว้ในช่อง Input)
  const handleOpenEdit = () => {
    setTempUsername(username); 
    setShowEditMenu(true);
  };

  // ฟังก์ชัน: เมื่อกดยกเลิก (ปิดเมนู โดยไม่เปลี่ยนชื่อจริง)
  const handleCancel = () => {
    setShowEditMenu(false);
  };

  // ฟังก์ชัน: เมื่อกดยืนยัน (เอาชื่อที่พิมพ์ใหม่ ไปทับชื่อจริง)
  const handleConfirm = () => {
    setUsername(tempUsername); 
    setShowEditMenu(false);
  };

  return (
    <div style={containerStyle}>
      {/* Navbar ดึงมาใช้จาก Component กลาง */}


      <div style={contentWrapper}>
        <h2 style={pageTitle}>My Profile</h2>
        
        <div style={profileCardBg}>
          <div style={avatarSection}>
            <div style={avatarLargeWrapper}>
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=dog" alt="Avatar" style={{ width: '100%' }} />
              <div style={cameraIconBadge}><Camera size={14} /></div>
            </div>
          </div>
          
          <div style={infoBoxWhite}>
            {/* แสดงชื่อจาก State username หลัก */}
            <h1 style={displayName}>{username}</h1>
            
            <div style={infoList}>
              <div style={infoItem}>
                <span style={infoLabel}>Username</span> 
                <span style={infoValue}>{username}</span>
              </div>
              <div style={infoItem}>
                <span style={infoLabel}>E-mail</span> 
                <span style={infoValue}>sususu@gmail.com</span>
              </div>
              <div style={infoItem}>
                <span style={infoLabel}>รหัสผ่าน</span> 
                <span style={infoValue}>********</span>
              </div>
            </div>

            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button style={editBtn} onClick={handleOpenEdit}>
                แก้ไขข้อมูลส่วนตัว
              </button>

              {/* Dropdown แก้ไขข้อมูล */}
              {showEditMenu && (
                <div style={editDropdownBox}>
                  <h3 style={editTitle}>แก้ไขข้อมูลส่วนตัว</h3>
                  
                  <div style={editField}>
                    <span style={editLabel}>Username ปัจจุบัน: {username}</span>
                  </div>
                  
                  <div style={editField}>
                    <label style={{display: 'block', marginBottom: '8px', color: '#666'}}>ชื่อที่ต้องการเปลี่ยน:</label>
                    <input 
                      type="text" 
                      style={editInput} 
                      value={tempUsername} // ผูกกับ State สำรอง
                      onChange={(e) => setTempUsername(e.target.value)}
                    />
                  </div>

                  <div style={editActionGroup}>
                    <button style={cancelBtn} onClick={handleCancel}>ยกเลิก</button>
                    <button style={confirmBtn} onClick={handleConfirm}>ยืนยัน</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Styles ---
const containerStyle: React.CSSProperties = { minHeight: '100vh', backgroundColor: '#fff', fontFamily: "'Kanit', sans-serif" };
const contentWrapper: React.CSSProperties = { maxWidth: '1100px', margin: '40px auto', padding: '0 20px' };
const pageTitle: React.CSSProperties = { color: '#9b67bd', fontSize: '32px', marginBottom: '25px' };
const profileCardBg: React.CSSProperties = { backgroundColor: '#ededed', borderRadius: '25px', padding: '50px', display: 'flex', gap: '50px', alignItems: 'center' };
const avatarSection: React.CSSProperties = { position: 'relative' };
const avatarLargeWrapper: React.CSSProperties = { width: '160px', height: '160px', borderRadius: '50%', backgroundColor: '#629be7', border: '3px solid #fff', overflow: 'hidden' };
const cameraIconBadge: React.CSSProperties = { position: 'absolute', bottom: '10px', right: '5px', backgroundColor: '#fff', padding: '6px', borderRadius: '50%', display: 'flex', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' };
const infoBoxWhite: React.CSSProperties = { backgroundColor: '#fff', borderRadius: '35px', padding: '40px 60px', flex: 1 };
const displayName: React.CSSProperties = { color: '#9b67bd', fontSize: '38px', margin: '0 0 25px 0' };
const infoList: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '35px' };
const infoItem: React.CSSProperties = { display: 'flex', fontSize: '18px' };
const infoLabel: React.CSSProperties = { color: '#888', width: '130px' };
const infoValue: React.CSSProperties = { color: '#333', fontWeight: 'bold' };
const editBtn: React.CSSProperties = { backgroundColor: '#bc7df2', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '12px', cursor: 'pointer', fontSize: '16px' };

const editDropdownBox: React.CSSProperties = { position: 'absolute', top: '60px', left: '0', width: '420px', backgroundColor: '#fff', borderRadius: '20px', padding: '25px', boxShadow: '0 10px 35px rgba(0,0,0,0.15)', zIndex: 100, border: '1px solid #f0f0f0' };
const editTitle: React.CSSProperties = { color: '#9b67bd', marginBottom: '20px', marginTop: 0, fontSize: '20px' };
const editField: React.CSSProperties = { marginBottom: '20px' };
const editLabel: React.CSSProperties = { fontSize: '15px', color: '#999' };
const editInput: React.CSSProperties = { display: 'block', width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #eee', fontSize: '16px', outline: 'none', boxSizing: 'border-box' };
const editActionGroup: React.CSSProperties = { display: 'flex', gap: '15px', justifyContent: 'center' };
const cancelBtn: React.CSSProperties = { padding: '10px 35px', borderRadius: '12px', border: 'none', backgroundColor: '#e0e0e0', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' };
const confirmBtn: React.CSSProperties = { padding: '10px 35px', borderRadius: '12px', border: 'none', backgroundColor: '#bc7df2', color: '#fff', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' };

export default Profile;
import React, { useState } from 'react'; //
import { useNavigate } from 'react-router-dom'; //
import { ChevronLeft, Play, BookOpen, Heart, Share2 } from 'lucide-react'; //

const MangaDetail = () => {
  const navigate = useNavigate(); //
  const [isHover, setIsHover] = useState(false); //

  const episodes = [
    { id: 1, title: 'บทนำ: การเริ่มต้นของจุดจบ', date: '12 ก.พ. 2026' },
    { id: 2, title: 'ตอนที่ 1: พลังที่ตื่นขึ้น', date: '13 ก.พ. 2026' },
  ];

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate(-1)} style={backBtn}><ChevronLeft /> ย้อนกลับ</button>
      
      <div style={headerCard}>
        <div style={coverBox}>มังงะ</div>
        <div style={infoBox}>
          <h1 style={titleText}>ชื่อเรื่อง มังงะสุดมันส์</h1>
          
          <p 
            style={{ 
              ...authorText, 
              cursor: 'pointer', 
              textDecoration: isHover ? 'underline' : 'none' 
            }} 
            onClick={() => navigate('/author/Suchanad-Maja')} //
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            โดย: Suchanad Maja
          </p>

          <div style={tagGroup}>
            <span style={tag}>แฟนตาซี</span>
            <span style={tag}>ผจญภัย</span>
          </div>
          <p style={descText}>เรื่องย่อ: ไม่บอก</p>
          <div style={statsRow}>
            <span><Heart size={16} /> 1.2k</span>
            <span><BookOpen size={16} /> 45k</span>
          </div>
        </div>
      </div>

      <div style={listSection}>
        <h3 style={sectionTitle}>รายการตอนทั้งหมด ({episodes.length})</h3>
        {episodes.map((ep) => (
          <div key={ep.id} style={episodeItem} onClick={() => navigate('/read-manga')}> {/* แก้เป็น read-manga */}
            <div>
              <div style={epTitle}>{ep.title}</div>
              <div style={epDate}>{ep.date}</div>
            </div>
            <Play size={18} color="#9b67bd" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles 
const containerStyle: React.CSSProperties = { maxWidth: '900px', margin: '40px auto', padding: '0 20px', fontFamily: "'Kanit', sans-serif" };
const backBtn: React.CSSProperties = { border: 'none', background: 'none', color: '#9b67bd', cursor: 'pointer', display: 'flex', alignItems: 'center', marginBottom: '20px', fontWeight: 'bold' };
const headerCard: React.CSSProperties = { display: 'flex', gap: '30px', backgroundColor: '#fff', padding: '30px', borderRadius: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '40px' };
const coverBox: React.CSSProperties = { width: '220px', height: '300px', backgroundColor: '#f3ebff', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#9b67bd', fontSize: '24px', fontWeight: 'bold', border: '1px solid #e0c3fc' };
const infoBox: React.CSSProperties = { flex: 1 };
const titleText: React.CSSProperties = { fontSize: '28px', margin: '0 0 10px 0', color: '#333' };
const authorText: React.CSSProperties = { color: '#9b67bd', fontWeight: '500', marginBottom: '15px' };
const tagGroup: React.CSSProperties = { display: 'flex', gap: '10px', marginBottom: '20px' };
const tag: React.CSSProperties = { backgroundColor: '#f0f0f0', padding: '5px 15px', borderRadius: '20px', fontSize: '13px', color: '#666' };
const descText: React.CSSProperties = { lineHeight: '1.7', color: '#555', marginBottom: '20px' };
const statsRow: React.CSSProperties = { display: 'flex', gap: '20px', color: '#aaa', fontSize: '14px' };
const listSection: React.CSSProperties = { backgroundColor: '#fcfaff', padding: '25px', borderRadius: '20px' };
const sectionTitle: React.CSSProperties = { margin: '0 0 20px 0', color: '#333' };
const episodeItem: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: '#fff', borderRadius: '15px', marginBottom: '10px', cursor: 'pointer', border: '1px solid #f0f0f0' };
const epTitle: React.CSSProperties = { fontWeight: '500', color: '#444' };
const epDate: React.CSSProperties = { fontSize: '12px', color: '#aaa', marginTop: '4px' };

export default MangaDetail;
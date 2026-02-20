import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PenTool, Bookmark, Eye, Heart, List, User, ChevronLeft } from 'lucide-react';

const AuthorPage = () => {
  const navigate = useNavigate();

  const authorData = {
    name: 'โม่เชียงถงซิ่ว',
    stats: { works: 3, bookmarks: 200, views: 700, likes: 20 },
    works: [
      { id: 1, title: 'ปรมาจารย์ลัทธิมาร', eps: 4, views: '200k', likes: '10k', img: 'https://m.media-amazon.com/images/I/81pYVvM2uPL._AC_UF1000,1000_QL80_.jpg' },
      { id: 2, title: 'สวรรค์ประทานพร', eps: 5, views: '200k', likes: '10k', img: 'https://m.media-amazon.com/images/I/815k-vKscGL._AC_UF1000,1000_QL80_.jpg' },
      { id: 3, title: 'ตัวร้ายอย่างข้า...จะหนีเอาตัวรอดยังไงดี', eps: 3, views: '200k', likes: '10k', img: 'https://m.media-amazon.com/images/I/81N6A7G-X2L._AC_UF1000,1000_QL80_.jpg' },
    ]
  };

  return (
    <div style={containerStyle}>
      {/* ปุ่มย้อนกลับ */}
      <button onClick={() => navigate(-1)} style={backBtnStyle}>
        <ChevronLeft size={18} /> ย้อนกลับ
      </button>

      {/* Profile Header */}
      <div style={headerWrapper}>
        <div style={avatarCircle}>
          <img 
            src="" 
            alt="" 
            style={avatarImg} 
          />
        </div>
        
        <div style={whiteStatCard}>
          <h1 style={authorTitle}>{authorData.name}</h1>
          <div style={statList}>
            <div style={statItem}><PenTool size={14} strokeWidth={2.5} /> งานเขียน {authorData.stats.works} เรื่อง</div>
            <div style={statItem}><Bookmark size={14} fill="currentColor" /> เพิ่มเข้าชั้น {authorData.stats.bookmarks} ครั้ง</div>
            <div style={statItem}><Eye size={14} strokeWidth={2.5} /> อ่าน {authorData.stats.views} ครั้ง</div>
            <div style={statItem}><Heart size={14} fill="currentColor" /> ชื่นชอบ {authorData.stats.likes} ครั้ง</div>
          </div>
        </div>
      </div>

      <h2 style={sectionTitle}>งานเขียนทั้งหมด</h2>

      {/* ส่วนผลงานด้านล่าง */}
      <div style={contentBoxGray}>
        <div style={tabContainer}>
          <button style={activeTabBtn}>ทั้งหมด ({authorData.works.length})</button>
        </div>
        
        <div style={worksGrid}>
          {authorData.works.map((work) => (
            <div 
              key={work.id} 
              style={novelCard} 
              onClick={() => navigate('/novel-detail')} // กดแล้วไปหน้า NovelDetail ตามที่สั่งครับ
              title="คลิกเพื่อดูรายละเอียดนิยาย"
            >
              <img src={work.img} alt={work.title} style={novelCover} />
              <div style={novelDetail}>
                <div style={novelTitleLine}>
                  <PenTool size={11} color="#9b67bd" fill="#9b67bd" />
                  <span style={novelTitleText}>{work.title}</span>
                </div>
                <div style={novelAuthorLine}>
                  <User size={11} />
                  <span>{authorData.name}</span>
                </div>
                <div style={novelStatsLine}>
                  <span><List size={11} /> {work.eps}</span>
                  <span><Eye size={11} /> {work.views}</span>
                  <span><Heart size={11} /> {work.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styles (Compact & Kanit)
const containerStyle: React.CSSProperties = { 
  maxWidth: '800px', 
  margin: '20px auto', 
  fontFamily: "'Kanit', sans-serif",
  color: '#333',
  padding: '0 15px'
};

const backBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  background: 'none',
  border: 'none',
  color: '#9b67bd',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 500,
  marginBottom: '15px',
  padding: '0'
};

const headerWrapper: React.CSSProperties = { 
  backgroundColor: '#f0f0f0', 
  borderRadius: '20px', 
  padding: '35px 25px', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  gap: '30px',
  marginBottom: '20px'
};

const avatarCircle: React.CSSProperties = {
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  backgroundColor: '#d0e3ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const avatarImg: React.CSSProperties = { width: '85%', height: '85%', objectFit: 'contain' };

const whiteStatCard: React.CSSProperties = { 
  backgroundColor: '#fff', 
  padding: '25px 40px', 
  borderRadius: '30px', 
  minWidth: '260px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
};

const authorTitle: React.CSSProperties = { fontSize: '28px', color: '#9b67bd', margin: '0 0 12px 0', fontWeight: 500 };

const statList: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '6px' };
const statItem: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 300 };

const sectionTitle: React.CSSProperties = { fontSize: '20px', color: '#9b67bd', marginBottom: '12px', fontWeight: 400, paddingLeft: '5px' };

const contentBoxGray: React.CSSProperties = { backgroundColor: '#f0f0f0', padding: '25px', borderRadius: '25px' };

const tabContainer: React.CSSProperties = { marginBottom: '15px' };
const activeTabBtn: React.CSSProperties = { 
  backgroundColor: '#9b67bd', 
  color: '#fff', 
  border: 'none', 
  padding: '6px 18px', 
  borderRadius: '10px', 
  fontSize: '14px', 
  fontFamily: "'Kanit', sans-serif",
  boxShadow: '0 3px 0px #7d529c',
  cursor: 'pointer',
  fontWeight: 500
};

const worksGrid: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' };

const novelCard: React.CSSProperties = { 
  display: 'flex', 
  backgroundColor: '#f9f9f9', 
  padding: '10px', 
  borderRadius: '6px',
  gap: '10px',
  cursor: 'pointer',
  transition: '0.2s'
};

const novelCover: React.CSSProperties = { width: '70px', height: '95px', objectFit: 'cover', borderRadius: '4px' };
const novelDetail: React.CSSProperties = { display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px' };
const novelTitleLine: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '4px', color: '#9b67bd' };
const novelTitleText: React.CSSProperties = { fontSize: '13px', fontWeight: 500 };
const novelAuthorLine: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#666' };
const novelStatsLine: React.CSSProperties = { display: 'flex', gap: '10px', fontSize: '11px', color: '#444' };

export default AuthorPage;
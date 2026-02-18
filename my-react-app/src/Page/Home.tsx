import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Eye, Heart } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('novel');

  // ข้อมูลหมวดหมู่ยอดนิยม
  const genres = [
    'Action', 'Romance', 'Fantasy', 'Horror', 'Comedy', 
    'Adventure', 'Drama', 'Sci-Fi / Fantasy', 'Slice of Life', 'Isekai'
  ];

  return (
    <div style={containerStyle}>
      <div style={wideContent}>
        {/* Banner ส่วนบน */}
        <div style={bannerGrid}>
          <div style={{...bannerCard, background: '#FF6B6B'}}>Chainsaw man</div>
          <div style={{...bannerCard, background: '#4ECDC4'}}>Frieren</div>
          <div style={{...bannerCard, background: '#45B7D1'}}>Gundam GQuuux</div>
          <div style={{...bannerCard, background: '#9B67BD'}}>Dandadan</div>
        </div>

        {/* Tab Bar สำหรับสลับ นิยาย / การ์ตูน */}
        <div style={tabBar}>
          <span 
            style={activeCategory === 'novel' ? activeTab : inactiveTab} 
            onClick={() => setActiveCategory('novel')}
          >
            นิยาย
          </span>
          <span 
            style={activeCategory === 'manga' ? activeTab : inactiveTab} 
            onClick={() => setActiveCategory('manga')}
          >
            การ์ตูน
          </span>
        </div>

        {/* ส่วนแสดงรายการหนังสือ */}
        <section style={sectionMargin}>
          <div style={sectionHeader}>
            <div style={titleGroup}>
               <div style={purpleLine}></div>
               <h3 style={sectionTitle}>
                 {activeCategory === 'novel' ? 'Novel / นิยาย' : 'Manga / การ์ตูน'}
               </h3>
            </div>
            <span style={viewMore}>ดูทั้งหมด {'>'}</span>
          </div>
          
          <div style={bookGrid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                style={bookCard} 
                onClick={() => {
                  if (activeCategory === 'novel') {
                    navigate('/novel-detail');
                  } else {
                    navigate('/manga-detail');
                  }
                }}
              >
                <div style={bookCover}>
                   <span style={{color: '#ccc'}}>{activeCategory === 'novel' ? 'Novel' : 'Manga'} {i}</span>
                </div>
                <p style={bookName}>ชื่อเรื่อง {i}...</p>
                <p style={authorName}>ชื่อผู้แต่ง / นามปากกา</p>
                <div style={statsContainer}>
                  <div style={statItem}><List size={14} color="#999" /><span style={statText}>0</span></div>
                  <div style={statItem}><Eye size={14} color="#999" /><span style={statText}>0</span></div>
                  <div style={statItem}><Heart size={14} color="#999" /><span style={statText}>0</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ส่วนแนวการ์ตูนยอดนิยม (เพิ่มใหม่ตามภาพ) */}
        <section style={genreSection}>
          <div style={titleGroup}>
            <div style={purpleLine}></div>
            <h3 style={sectionTitle}>แนวการ์ตูนยอดนิยม</h3>
          </div>
          
          <div style={genreList}>
            {genres.map((genre) => (
              <span key={genre} style={genreTag}>
                {genre}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// --- Styles ---
const containerStyle: React.CSSProperties = { backgroundColor: '#fff', minHeight: '100vh', fontFamily: "'Kanit', sans-serif" };
const wideContent: React.CSSProperties = { maxWidth: '1700px', margin: '30px auto', padding: '0 30px' };
const bannerGrid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' };
const bannerCard: React.CSSProperties = { height: '200px', borderRadius: '16px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '22px' };
const tabBar: React.CSSProperties = { display: 'flex', gap: '40px', marginBottom: '35px', borderBottom: '1px solid #eee' };
const activeTab: React.CSSProperties = { color: '#9b67bd', borderBottom: '3px solid #9b67bd', paddingBottom: '12px', fontWeight: '600', fontSize: '18px', cursor: 'pointer' };
const inactiveTab: React.CSSProperties = { color: '#aaa', paddingBottom: '12px', fontSize: '18px', cursor: 'pointer' };
const sectionMargin: React.CSSProperties = { marginBottom: '50px' };
const sectionHeader: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' };
const titleGroup: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '12px' };
const purpleLine: React.CSSProperties = { width: '5px', height: '24px', backgroundColor: '#9b67bd', borderRadius: '4px' };
const sectionTitle: React.CSSProperties = { fontSize: '24px', margin: 0, fontWeight: 'bold', color: '#222' };
const viewMore: React.CSSProperties = { color: '#9b67bd', fontSize: '14px', cursor: 'pointer' };
const bookGrid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '25px' }; 
const bookCard: React.CSSProperties = { cursor: 'pointer' };
const bookCover: React.CSSProperties = { width: '100%', height: '300px', borderRadius: '12px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f0f0f0' };
const bookName: React.CSSProperties = { fontSize: '15px', fontWeight: '600', color: '#333', marginBottom: '4px' };
const authorName: React.CSSProperties = { fontSize: '13px', color: '#999', marginBottom: '8px' };
const statsContainer: React.CSSProperties = { display: 'flex', gap: '12px' };
const statItem: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '4px' };
const statText: React.CSSProperties = { fontSize: '12px', color: '#aaa' };

// เพิ่มเติม Style ส่วน Genre
const genreSection: React.CSSProperties = { marginTop: '60px', marginBottom: '80px' };
const genreList: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '25px' };
const genreTag: React.CSSProperties = { 
  padding: '10px 22px', 
  backgroundColor: '#efefef', 
  borderRadius: '25px', 
  fontSize: '15px', 
  color: '#555', 
  cursor: 'pointer',
  fontWeight: '500'
};

export default Home;
import React from 'react';
import { List, Eye, Heart, Home as HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyReading = () => {
  const navigate = useNavigate();

  // ข้อมูลจำลองสำหรับหนังสือในคลัง
  const readingList = [
    { id: 1, title: 'Gokurakugai', author: 'Yuto Sano', episodes: 20, views: 200, likes: 10, img: '#FF6B6B' },
    { id: 2, title: 'DANDADAN', author: 'Yukinobu Tatsu', episodes: 20, views: 200, likes: 10, img: '#9B67BD' },
    { id: 3, title: 'SAKAMOTO DAYS', author: 'Yuto Suzuki', episodes: 20, views: 200, likes: 10, img: '#4ECDC4', badge: 'อ่านต่อ' },
    { id: 4, title: 'Hunter x Hunter', author: 'Yoshihiro Togashi', episodes: 10, views: 50, likes: 10, img: '#45B7D1' },
    { id: 5, title: 'วันพีซ', author: 'Eiichiro Oda', episodes: 10, views: 20, likes: 20, img: '#FFD93D' },
    { id: 6, title: 'KAGURABACHI คากุระบาจิ', author: 'Takeru Hokazono', episodes: 20, views: 200, likes: 10, img: '#222' },
  ];

  const genres = ['Action', 'Romance', 'Fantasy', 'Horror', 'Comedy', 'Adventure', 'Drama', 'Sci-Fi / Fantasy', 'Slice of Life', 'Isekai'];

  return (
    <div style={containerStyle}>
      <div style={wideContent}>
        {/* Header ส่วนหัวหน้า */}
        <div style={headerSection}>
          <h2 style={pageTitle}>
            My Reading <span style={subTitle}>คลังของฉัน</span>
          </h2>
        </div>

        {/* Tab ชั้นหนังสือ */}
        <div style={tabContainer}>
          <span style={activeTab}>ชั้นหนังสือ</span>
        </div>

        {/* รายการหนังสือ */}
        <div style={bookGrid}>
          {readingList.map((book) => (
            <div key={book.id} style={bookCard}>
              <div style={{...bookCover, background: book.img}}>
                {book.badge && <div style={readingBadge}>{book.badge}</div>}
                <span style={{color: 'rgba(255,255,255,0.5)'}}>Cover</span>
              </div>
              <p style={bookName}>{book.title}</p>
              <p style={authorName}>{book.author}</p>
              <div style={statsContainer}>
                <div style={statItem}><List size={14} color="#999" /><span style={statText}>{book.episodes}</span></div>
                <div style={statItem}><Eye size={14} color="#999" /><span style={statText}>{book.views}</span></div>
                <div style={statItem}><Heart size={14} color="#999" /><span style={statText}>{book.likes}</span></div>
              </div>
            </div>
          ))}
        </div>

        {/* ส่วนหมวดหมู่ยอดนิยมข้างล่าง */}
        <section style={genreSection}>
          <h3 style={genreTitle}>แนวการ์ตูนยอดนิยม</h3>
          <div style={genreList}>
            {genres.map((genre) => (
              <span key={genre} style={genreTag}>{genre}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// --- Styles (อ้างอิงจากดีไซน์ที่คุณส่งมา) ---
const containerStyle: React.CSSProperties = { backgroundColor: '#f9f9f9', minHeight: '100vh', fontFamily: "'Kanit', sans-serif", paddingBottom: '50px' };
const wideContent: React.CSSProperties = { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' };

const headerSection: React.CSSProperties = { marginBottom: '30px' };
const pageTitle: React.CSSProperties = { fontSize: '32px', color: '#9b67bd', fontWeight: 'bold', margin: 0 };
const subTitle: React.CSSProperties = { fontSize: '20px', color: '#aaa', fontWeight: 'normal', marginLeft: '10px' };

const tabContainer: React.CSSProperties = { borderBottom: '1px solid #eee', marginBottom: '30px', paddingBottom: '10px' };
const activeTab: React.CSSProperties = { color: '#9b67bd', fontSize: '20px', fontWeight: '600', cursor: 'pointer' };

const bookGrid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '30px' };
const bookCard: React.CSSProperties = { cursor: 'pointer', backgroundColor: '#fff', padding: '10px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' };
const bookCover: React.CSSProperties = { width: '100%', height: '240px', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' };
const readingBadge: React.CSSProperties = { position: 'absolute', bottom: '10px', right: '10px', backgroundColor: '#9b67bd', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' };

const bookName: React.CSSProperties = { fontSize: '15px', fontWeight: '600', color: '#9b67bd', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
const authorName: React.CSSProperties = { fontSize: '13px', color: '#999', marginBottom: '10px' };
const statsContainer: React.CSSProperties = { display: 'flex', gap: '15px', borderTop: '1px solid #f5f5f5', paddingTop: '10px' };
const statItem: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '4px' };
const statText: React.CSSProperties = { fontSize: '12px', color: '#999' };

const genreSection: React.CSSProperties = { marginTop: '60px' };
const genreTitle: React.CSSProperties = { fontSize: '22px', color: '#9b67bd', marginBottom: '20px' };
const genreList: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '10px' };
const genreTag: React.CSSProperties = { padding: '8px 16px', backgroundColor: '#e0e0e0', borderRadius: '20px', fontSize: '14px', color: '#444', cursor: 'pointer' };

export default MyReading;
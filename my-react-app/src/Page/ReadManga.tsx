import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, List, Type, Bookmark } from 'lucide-react';
import CommentSection from '../Components/CommentSection';

const ReadManga = () => {
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(1);
  const chapterTitle = `บทที่ ${chapter} | นักฆ่าในตำนาน`;

  // เลื่อนขึ้นบนสุดเมื่อเปลี่ยนตอน
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [chapter]);

  const handleNext = () => setChapter(prev => prev + 1);
  const handlePrev = () => setChapter(prev => Math.max(1, prev - 1));

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: "'Kanit', sans-serif" }}>
      <div style={topNavStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
           <button onClick={() => navigate(-1)} style={iconBtnStyle}><ChevronLeft size={24} /></button>
           <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#a855f7' }}>{chapterTitle}</span>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={toolItemStyle}><List size={20} /> <span style={toolTextStyle}>สารบัญ</span></div>
          <div style={toolItemStyle}><Type size={20} /> <span style={toolTextStyle}>ตั้งค่าอ่าน</span></div>
          <div style={toolItemStyle}><Bookmark size={20} /> <span style={toolTextStyle}>เพิ่มเข้าชั้น</span></div>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', padding: '30px 20px' }}>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '5px' }}>เรื่อง : SAKAMOTO DAYS</p>
          <h2 style={{ color: '#a855f7', fontSize: '22px', margin: 0 }}>{chapterTitle}</h2>
          <p style={{ color: '#666', fontSize: '14px' }}>โดย Yuto Suzuki</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <img src={`https://via.placeholder.com/800x1200?text=Chapter+${chapter}+Page+1`} alt="p1" style={mangaImgStyle} />
          <img src={`https://via.placeholder.com/800x1200?text=Chapter+${chapter}+Page+2`} alt="p2" style={mangaImgStyle} />
        </div>

        <div style={{ padding: '20px' }}>
            <div style={navButtonRowStyle}>
                <button 
                  onClick={handlePrev} 
                  disabled={chapter === 1}
                  style={{...prevBtnStyle, opacity: chapter === 1 ? 0.5 : 1, cursor: chapter === 1 ? 'default' : 'pointer'}}
                >
                  ตอนก่อนหน้า
                </button>
                <button onClick={handleNext} style={nextBtnStyle}>ตอนต่อไป</button>
            </div>
            <CommentSection currentChapterId={chapter} currentChapterTitle={chapterTitle} />
        </div>
      </div>
    </div>
  );
};

const topNavStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', borderBottom: '1px solid #eee', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10 };
const iconBtnStyle: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer' };
const toolItemStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: '#555' };
const toolTextStyle: React.CSSProperties = { fontSize: '10px', marginTop: '2px' };
const mangaImgStyle: React.CSSProperties = { width: '100%', height: 'auto', display: 'block' };
const navButtonRowStyle: React.CSSProperties = { display: 'flex', gap: '10px', marginBottom: '40px' };
const prevBtnStyle: React.CSSProperties = { flex: 1, padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#f0f0f0', color: '#999', fontWeight: 'bold' };
const nextBtnStyle: React.CSSProperties = { flex: 1, padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#c084fc', color: '#fff', fontWeight: 'bold', cursor: 'pointer' };

export default ReadManga;
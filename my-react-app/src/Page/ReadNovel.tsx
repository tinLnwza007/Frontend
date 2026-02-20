import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, List, Type, Bookmark } from 'lucide-react';
import CommentSection from '../Components/CommentSection';

const ReadNovel = () => {
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(0);

  const novelData = [
    { title: "Prologue", content: "ปรมาจารย์อี๋หลิง เว่ยอู๋เซี่ยน สิ้นชีพ ณ เนินป่าช้า... ว่ากันว่ากายแหลกเหลว ไร้ร่างให้ดินกลบฝัง..." },
    { title: "บทที่ 1 การกลับมา", content: "สิบสามปีผ่านไป แสงจันทร์ยังคงสาดส่องที่เดิม แต่ผู้ที่ลืมตาตื่นขึ้นมากลับอยู่ในร่างของโม่เสวียนยวี่!" }
  ];

  const currentChapter = novelData[chapter] || novelData[0];
  const chapterTitle = `บทที่ ${chapter} | ${currentChapter.title}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [chapter]);

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: "'Kanit', sans-serif" }}>
      <div style={topNavStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
           <button onClick={() => navigate(-1)} style={iconBtnStyle}><ChevronLeft size={24} /></button>
           <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#a855f7' }}>{chapterTitle}</span>
        </div>
      </div>

      <div style={contentContainerStyle}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '5px' }}>เรื่อง : ปรมาจารย์ลัทธิมาร</p>
          <h2 style={{ color: '#a855f7', fontSize: '24px', margin: '0' }}>{chapterTitle}</h2>
          <p style={{ color: '#666', fontSize: '14px' }}>โดย โม่เซียงถงซี</p>
        </div>

        <div style={textContentStyle}>
          {currentChapter.content}
        </div>

        <div style={navButtonRowStyle}>
          <button 
            onClick={() => setChapter(prev => Math.max(0, prev - 1))} 
            disabled={chapter === 0}
            style={{...prevBtnStyle, opacity: chapter === 0 ? 0.5 : 1, cursor: chapter === 0 ? 'default' : 'pointer'}}
          >
            ตอนก่อนหน้า
          </button>
          <button 
            onClick={() => setChapter(prev => Math.min(novelData.length - 1, prev + 1))} 
            disabled={chapter === novelData.length - 1}
            style={{...nextBtnStyle, opacity: chapter === novelData.length - 1 ? 0.5 : 1}}
          >
            ตอนต่อไป
          </button>
        </div>

        <CommentSection currentChapterId={chapter} currentChapterTitle={chapterTitle} />
      </div>
    </div>
  );
};

// Styles 
const topNavStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', borderBottom: '1px solid #eee', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10 };
const iconBtnStyle: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer' };
const contentContainerStyle: React.CSSProperties = { maxWidth: '700px', margin: '0 auto', padding: '40px 20px' };
const textContentStyle: React.CSSProperties = { fontSize: '18px', lineHeight: '2.5', textAlign: 'center', color: '#333', marginBottom: '60px', whiteSpace: 'pre-line' };
const navButtonRowStyle: React.CSSProperties = { display: 'flex', gap: '10px', marginBottom: '40px' };
const prevBtnStyle: React.CSSProperties = { flex: 1, padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#f0f0f0', color: '#999', fontWeight: 'bold' };
const nextBtnStyle: React.CSSProperties = { flex: 1, padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#c084fc', color: '#fff', fontWeight: 'bold', cursor: 'pointer' };

export default ReadNovel;
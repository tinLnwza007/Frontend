import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Eye, Heart, Bookmark, Edit, Trash2 } from 'lucide-react';

const BuildNovel = () => {
  const navigate = useNavigate();
  
  // --- States ---
  const [chapters, setChapters] = useState<any[]>([]);
  const [isPublished, setIsPublished] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  // ดึงข้อมูลจาก LocalStorage เมื่อโหลดหน้า
  useEffect(() => {
    const savedChapters = JSON.parse(localStorage.getItem('novel_chapters') || '[]');
    setChapters(savedChapters);
  }, []);

  // --- Functions ---
  
  // เมื่อกดเปิด/ปิด Switch เผยแพร่
  const handleTogglePublish = () => {
    if (!isPublished) {
      // ถ้าปัจจุบันปิดอยู่ (สีเทา) แล้วจะเปิด ให้แสดง Modal
      setShowPublishModal(true);
    } else {
      // ถ้าเปิดอยู่แล้ว (สีเขียว) กดปิดได้เลย
      setIsPublished(false);
    }
  };

  const handleDelete = (id: string | number) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบตอนนี้?')) {
      const updatedChapters = chapters.filter(chapter => chapter.id !== id);
      setChapters(updatedChapters);
      localStorage.setItem('novel_chapters', JSON.stringify(updatedChapters));
    }
  };

  const handleEdit = (id: string | number) => {
    navigate(`/edit-chapter-novel/${id}`);
  };

  return (
    <div style={pageContainer}>
      {/* Header */}
      <div style={headerNav}>
        <button onClick={() => navigate(-1)} style={backBtn}>
          <ChevronLeft size={20} /> ย้อนกลับ
        </button>
      </div>

      <div style={mainContent}>
        {/* รายละเอียดนิยาย */}
        <div style={detailCard}>
          <div style={topSection}>
            <div style={coverPlaceholder}></div>
            <div style={infoArea}>
              <h2 style={titleText}>ชื่อเรื่อง นายเงือกของเดชาโรว</h2>
              <p style={authorText}>โดย หยาเซิง</p>
              <div style={statsRow}>
                <span style={statItem}><Eye size={16} /> 0</span>
                <span style={statItem}><Heart size={16} /> 0</span>
                <span style={statItem}><Bookmark size={16} /> 0</span>
              </div>
              <div style={introBox}>
                <h4 style={introTitle}>แนะนำเนื้อเรื่อง</h4>
                <p style={introText}>เดชาโรว นักศึกษาชั้นปี 4 สาขาชีววิทยาจากสถาบันวิทยาศาสตร์ทางทะเล...</p>
              </div>
            </div>
          </div>
        </div>

        {/* ปุ่มเพิ่มตอน */}
        <button 
          style={addChapterBtn} 
          onClick={() => navigate('/add-chapter-novel')}
        >
          เพิ่มตอน +
        </button>

        {/* รายการตอนที่เพิ่มแล้ว */}
        <div style={chapterListContainer}>
          {chapters.length > 0 ? (
            chapters.map((chapter, index) => (
              <div key={chapter.id || index} style={chapterItemCard}>
                <div style={chapterInfo}>
                  <span style={chapterNumber}>ตอนที่ {index + 1}</span>
                  <span style={chapterTitleText}>{chapter.title}</span>
                  <span style={chapterDate}>{chapter.date || '17/2/2569'}</span>
                  <span style={{ 
                    ...statusBadge, 
                    backgroundColor: chapter.isPublished ? '#e8f5e9' : '#fff3e0',
                    color: chapter.isPublished ? '#4caf50' : '#ff9800'
                  }}>
                    {chapter.isPublished ? 'เผยแพร่' : 'ร่าง'}
                  </span>
                </div>
                <div style={chapterActions}>
                   <button style={actionIconBtn} onClick={() => handleEdit(chapter.id)}>
                    <Edit size={18} />
                   </button>
                   <button style={{...actionIconBtn, color: '#ff4d4d'}} onClick={() => handleDelete(chapter.id)}>
                    <Trash2 size={18} />
                   </button>
                </div>
              </div>
            ))
          ) : (
            <div style={emptyState}>ยังไม่มีตอนที่เพิ่มเข้ามา</div>
          )}
        </div>

        {/* Status Bar ด้านล่าง */}
        <div style={statusRowContainer}>
          <span style={statusTitle}>เผยแพร่ :</span>
          <div style={statusWhiteCard}>
            <div style={toggleSection}>
              <div style={toggleItem}>
                <span style={toggleLabel}>สถานะเรื่อง</span>
                <div 
                  onClick={handleTogglePublish} 
                  style={{...switchBase, backgroundColor: isPublished ? '#4caf50' : '#ddd'}}
                >
                  <div style={{...switchThumb, left: isPublished ? '22px' : '2px'}} />
                </div>
                <span style={{ color: isPublished ? '#4caf50' : '#999', fontSize: '14px', minWidth: '60px' }}>
                  {isPublished ? 'เผยแพร่' : 'ร่าง'}
                </span>
              </div>

              <div style={toggleItem}>
                <span style={toggleLabel}>สถานะจบ</span>
                <div 
                  onClick={() => setIsCompleted(!isCompleted)} 
                  style={{...switchBase, backgroundColor: isCompleted ? '#4caf50' : '#ddd'}}
                >
                  <div style={{...switchThumb, left: isCompleted ? '22px' : '2px'}} />
                </div>
                <span style={{ color: isCompleted ? '#4caf50' : '#999', fontSize: '14px', minWidth: '60px' }}>
                  {isCompleted ? 'จบแล้ว' : 'ยังไม่จบ'}
                </span>
              </div>
            </div>

            <div style={actionButtons}>
              <button style={btnGray} onClick={() => navigate(-1)}>ยกเลิก</button>
              <button style={btnPurple} onClick={() => alert('บันทึกสำเร็จ')}>บันทึก</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Publish Modal (Dropdown จากหน้า CreateNovel) --- */}
      {showPublishModal && (
        <div style={modalOverlay}>
          <div style={modalContainer}>
            <h2 style={modalTitle}>ต้องการเผยแพร่หรือไม่</h2>
            <div style={modalActionArea}>
              <button 
                style={btnPublishNow} 
                onClick={() => { setIsPublished(true); setShowPublishModal(false); }}
              >
                เผยแพร่เลย
              </button>
              <button 
                style={btnKeepDraft} 
                onClick={() => { setIsPublished(false); setShowPublishModal(false); }}
              >
                เป็นร่างไว้ก่อน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Styles ---
const pageContainer: React.CSSProperties = { minHeight: '100vh', backgroundColor: '#f9f9f9', padding: '20px', fontFamily: "'Kanit', sans-serif" };
const headerNav = { maxWidth: '900px', margin: '0 auto 20px auto' };
const backBtn = { background: 'none', border: 'none', color: '#bc7df2', cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 'bold' };
const mainContent = { maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' };
const detailCard: React.CSSProperties = { backgroundColor: '#eeeeee', borderRadius: '30px', padding: '40px', width: '100%', border: '1px solid #f0f0f0' };
const topSection = { display: 'flex', gap: '30px' };
const coverPlaceholder = { width: '250px', height: '350px', backgroundColor: '#fff', borderRadius: '20px' };
const infoArea = { flex: 1 };
const titleText = { color: '#bc7df2', fontSize: '26px', marginBottom: '10px' };
const authorText = { color: '#333', fontSize: '18px', marginBottom: '20px' };
const statsRow = { display: 'flex', gap: '20px', marginBottom: '20px', color: '#666' };
const statItem = { display: 'flex', alignItems: 'center', gap: '5px' };
const introBox = { backgroundColor: '#fff', borderRadius: '20px', padding: '20px', minHeight: '120px' };
const introTitle = { color: '#bc7df2', marginBottom: '10px' };
const introText = { color: '#555', fontSize: '14px', lineHeight: '1.6' };
const addChapterBtn = { width: '100%', padding: '15px', borderRadius: '30px', border: 'none', backgroundColor: '#bc7df2', color: '#fff', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' };
const chapterListContainer = { width: '100%', display: 'flex', flexDirection: 'column' as const, gap: '15px' };
const chapterItemCard: React.CSSProperties = { width: '100%', backgroundColor: '#fff', padding: '20px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' };
const chapterInfo = { display: 'flex', alignItems: 'center', gap: '20px', flex: 1 };
const chapterNumber = { fontWeight: 'bold', color: '#bc7df2', minWidth: '60px' };
const chapterTitleText = { flex: 1, fontSize: '16px', color: '#333' };
const chapterDate = { fontSize: '14px', color: '#999' };
const statusBadge = { padding: '4px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' };
const chapterActions = { display: 'flex', gap: '10px' };
const actionIconBtn = { background: 'none', border: 'none', cursor: 'pointer', color: '#666', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const emptyState = { width: '100%', padding: '40px', textAlign: 'center' as const, color: '#999', backgroundColor: '#fff', borderRadius: '20px' };

const statusRowContainer: React.CSSProperties = { width: '100%', display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px' };
const statusTitle = { color: '#bc7df2', fontWeight: 'bold', fontSize: '20px' };
const statusWhiteCard: React.CSSProperties = { flex: 1, backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '25px', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' };
const toggleSection = { display: 'flex', flexDirection: 'column' as const, gap: '8px' };
const toggleItem = { display: 'flex', alignItems: 'center', gap: '15px' };
const toggleLabel = { fontSize: '14px', color: '#666', width: '80px' };
const switchBase: React.CSSProperties = { width: '42px', height: '22px', borderRadius: '20px', position: 'relative', cursor: 'pointer', transition: '0.3s' };
const switchThumb: React.CSSProperties = { width: '18px', height: '18px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', transition: '0.3s' };
const actionButtons = { display: 'flex', gap: '12px' };
const btnGray = { padding: '10px 35px', borderRadius: '15px', border: 'none', backgroundColor: '#666', color: '#fff', cursor: 'pointer', fontWeight: 'bold' };
const btnPurple = { padding: '10px 35px', borderRadius: '15px', border: 'none', backgroundColor: '#bc7df2', color: '#fff', cursor: 'pointer', fontWeight: 'bold' };

// Modal Styles (เหมือน CreateNovel)
const modalOverlay: React.CSSProperties = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContainer: React.CSSProperties = { width: '400px', backgroundColor: '#fff', borderRadius: '45px', padding: '45px 35px', textAlign: 'center', border: '5px solid #bc7df2', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' };
const modalTitle = { fontSize: '26px', fontWeight: 'bold', color: '#333', marginBottom: '15px' };
const modalActionArea = { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '15px' };
const btnPublishNow: React.CSSProperties = { width: '260px', padding: '14px 0', backgroundColor: '#bc7df2', color: '#fff', border: 'none', borderRadius: '35px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' };
const btnKeepDraft: React.CSSProperties = { width: '150px', padding: '10px 0', backgroundColor: '#f2f2f2', color: '#666', border: 'none', borderRadius: '30px', fontSize: '16px', cursor: 'pointer' };

export default BuildNovel;
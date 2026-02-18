import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Eye, Heart, Bookmark, Edit, Trash2, 
  Image as ImageIcon 
} from 'lucide-react';

const BuildManga = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // --- States ---
  const [work, setWork] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPublished, setIsPublished] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  // ดึงข้อมูลจาก LocalStorage ตาม ID
  useEffect(() => {
    const loadData = () => {
      try {
        setLoading(true);
        const savedWorks = JSON.parse(localStorage.getItem('myWorks') || '[]');
        const currentWork = savedWorks.find((w: any) => String(w.id) === String(id));

        if (currentWork) {
          setWork(currentWork);
          setEpisodes(currentWork.episodes || []);
          setIsPublished(currentWork.isPublished || false);
        }
      } catch (error) {
        console.error("Error loading manga data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  // --- Functions ---
  const handleTogglePublish = () => {
    if (!isPublished) {
      setShowPublishModal(true);
    } else {
      setIsPublished(false);
    }
  };

  const handleDeleteEpisode = (index: number) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบตอนนี้?')) {
      const updatedEpisodes = episodes.filter((_, i) => i !== index);
      setEpisodes(updatedEpisodes);
      
      // อัปเดตกลับไปยัง localStorage
      const savedWorks = JSON.parse(localStorage.getItem('myWorks') || '[]');
      const workIndex = savedWorks.findIndex((w: any) => String(w.id) === String(id));
      if (workIndex !== -1) {
        savedWorks[workIndex].episodes = updatedEpisodes;
        localStorage.setItem('myWorks', JSON.stringify(savedWorks));
      }
    }
  };

  if (loading) return <div style={centerTextStyle}>กำลังโหลดข้อมูล...</div>;

  if (!work) return (
    <div style={centerTextStyle}>
      <h2>ไม่พบข้อมูลการ์ตูนเรื่องนี้</h2>
      <button onClick={() => navigate('/writing')} style={btnBackStyle}>กลับไปหน้าจัดการ</button>
    </div>
  );

  return (
    <div style={pageContainer}>
      {/* Header */}
      <div style={headerNav}>
        <button onClick={() => navigate('/writing')} style={backBtn}>
          <ChevronLeft size={20} /> ย้อนกลับ
        </button>
      </div>

      <div style={mainContent}>
        {/* รายละเอียดมังงะ (UI ตาม BuildNovel) */}
        <div style={detailCard}>
          <div style={topSection}>
            <div style={{
              ...coverPlaceholder,
              backgroundImage: work.image ? `url(${work.image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {!work.image && <ImageIcon size={50} color="#ccc" />}
            </div>
            <div style={infoArea}>
              <h2 style={titleText}>{work.title}</h2>
              <p style={authorText}>โดย {work.author || 'ไม่ระบุนามปากกา'}</p>
              <div style={statsRow}>
                <span style={statItem}><Eye size={16} /> 0</span>
                <span style={statItem}><Heart size={16} /> 0</span>
                <span style={statItem}><Bookmark size={16} /> 0</span>
              </div>
              <div style={introBox}>
                <h4 style={introTitle}>แนะนำเรื่องย่อ</h4>
                <p style={introText}>{work.description || 'ยังไม่มีคำอธิบายเนื้อเรื่อง...'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ปุ่มเพิ่มตอน */}
        <button 
         style={addChapterBtn} 
         onClick={() => navigate(`/add-chapter-manga/${id}`)}// ส่ง ID ของมังงะไปด้วย
        > เพิ่มตอนใหม่ + </button>

        {/* รายการตอน (UI ตาม BuildNovel) */}
        <div style={chapterListContainer}>
          {episodes.length > 0 ? (
            episodes.map((ep, index) => (
              <div key={index} style={chapterItemCard}>
                <div style={chapterInfo}>
                  <span style={chapterNumber}>ตอนที่ {index + 1}</span>
                  <span style={chapterTitleText}>{ep.title}</span>
                  <span style={chapterDate}>17/2/2569</span>
                  <span style={{ 
                    ...statusBadge, 
                    backgroundColor: work.isPublished ? '#e8f5e9' : '#fff3e0',
                    color: work.isPublished ? '#4caf50' : '#ff9800'
                  }}>
                    {work.isPublished ? 'เผยแพร่' : 'ร่าง'}
                  </span>
                </div>
                <div style={chapterActions}>
                   <button style={actionIconBtn}><Edit size={18} /></button>
                   <button style={{...actionIconBtn, color: '#ff4d4d'}} onClick={() => handleDeleteEpisode(index)}>
                    <Trash2 size={18} />
                   </button>
                </div>
              </div>
            ))
          ) : (
            <div style={emptyState}>ยังไม่มีตอนที่เพิ่มเข้ามา</div>
          )}
        </div>

        {/* Status Bar ด้านล่าง (UI ตาม BuildNovel) */}
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
              <button style={btnGray} onClick={() => navigate('/writing')}>ยกเลิก</button>
              <button style={btnPurple} onClick={() => navigate(`/build-manga/${work.id}`)}>บันทึก</button>
            </div>
          </div>
        </div>
      </div>

      {/* Publish Modal */}
      {showPublishModal && (
        <div style={modalOverlay}>
          <div style={modalContainer}>
            <h2 style={modalTitle}>ต้องการเผยแพร่มังงะเรื่องนี้หรือไม่</h2>
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

// --- Styles (ถอดแบบมาจาก BuildNovel.tsx ทุกประการ) ---
const pageContainer: React.CSSProperties = { minHeight: '100vh', backgroundColor: '#f9f9f9', padding: '20px', fontFamily: "'Kanit', sans-serif" };
const headerNav = { maxWidth: '900px', margin: '0 auto 20px auto' };
const backBtn = { background: 'none', border: 'none', color: '#bc7df2', cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '16px' };
const mainContent = { maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' };
const detailCard: React.CSSProperties = { backgroundColor: '#eeeeee', borderRadius: '30px', padding: '40px', width: '100%', border: '1px solid #f0f0f0' };
const topSection = { display: 'flex', gap: '30px' };
const coverPlaceholder = { width: '250px', height: '350px', backgroundColor: '#fff', borderRadius: '20px', flexShrink: 0 };
const infoArea = { flex: 1 };
const titleText = { color: '#bc7df2', fontSize: '26px', marginBottom: '10px', fontWeight: 'bold' };
const authorText = { color: '#333', fontSize: '18px', marginBottom: '20px' };
const statsRow = { display: 'flex', gap: '20px', marginBottom: '20px', color: '#666' };
const statItem = { display: 'flex', alignItems: 'center', gap: '5px' };
const introBox = { backgroundColor: '#fff', borderRadius: '20px', padding: '20px', minHeight: '120px' };
const introTitle = { color: '#bc7df2', marginBottom: '10px', fontWeight: 'bold' };
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
const actionIconBtn = { background: 'none', border: 'none', cursor: 'pointer', color: '#666', padding: '5px', display: 'flex', alignItems: 'center' };
const emptyState = { width: '100%', padding: '40px', textAlign: 'center' as const, color: '#999', backgroundColor: '#fff', borderRadius: '20px' };
const statusRowContainer: React.CSSProperties = { width: '100%', display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px', marginBottom: '50px' };
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
const modalOverlay: React.CSSProperties = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContainer: React.CSSProperties = { width: '400px', backgroundColor: '#fff', borderRadius: '45px', padding: '45px 35px', textAlign: 'center', border: '5px solid #bc7df2' };
const modalTitle = { fontSize: '26px', fontWeight: 'bold', color: '#333', marginBottom: '15px' };
const modalActionArea = { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '15px' };
const btnPublishNow = { width: '260px', padding: '14px 0', backgroundColor: '#bc7df2', color: '#fff', border: 'none', borderRadius: '35px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' };
const btnKeepDraft = { width: '150px', padding: '10px 0', backgroundColor: '#f2f2f2', color: '#666', border: 'none', borderRadius: '30px', fontSize: '16px', cursor: 'pointer' };
const centerTextStyle: React.CSSProperties = { textAlign: 'center', marginTop: '100px', fontFamily: 'Kanit' };
const btnBackStyle = { marginTop: '20px', padding: '10px 20px', backgroundColor: '#bc7df2', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer' };

export default BuildManga;
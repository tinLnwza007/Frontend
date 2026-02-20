import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Undo2, Redo2, Bold, Underline, ImageIcon,
  AlignLeft, AlignCenter, AlignRight, ChevronLeft
} from 'lucide-react';

const AddChapterNovel = () => {
  const navigate = useNavigate();
  
  const [isPublished, setIsPublished] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [chapterTitle, setChapterTitle] = useState("วันแรกที่ย้ายมา");
  const [content, setContent] = useState("");

  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showSuccessOption, setShowSuccessOption] = useState(false);
  // เพิ่ม state สำหรับ dropdown/modal เผยแพร่
  const [showPublishModal, setShowPublishModal] = useState(false);

  // ฟังก์ชันจัดการเมื่อกด Switch เผยแพร่
  const handleTogglePublish = () => {
    if (!isPublished) {
      setShowPublishModal(true); // ถ้ายังไม่เผยแพร่ ให้เปิด Modal ถาม
    } else {
      setIsPublished(false); // ถ้าเผยแพร่อยู่แล้ว ให้ปิดเป็นร่างทันที
    }
  };

  const executeSaveData = () => {
    const existingChapters = JSON.parse(localStorage.getItem('novel_chapters') || '[]');
    const newChapter = {
      id: Date.now(),
      title: chapterTitle,
      content: content,
      isPublished: isPublished,
      isCompleted: isCompleted,
      date: new Date().toLocaleDateString('th-TH'),
      viewCount: 0
    };
    const updatedChapters = [...existingChapters, newChapter];
    localStorage.setItem('novel_chapters', JSON.stringify(updatedChapters));

    setShowSaveConfirm(false);
    setShowSuccessOption(true);
  };

  return (
    <div style={pageContainer}>
      <div style={headerNav}>
        <button onClick={() => navigate(-1)} style={backBtn}>
          <ChevronLeft size={20} /> ย้อนกลับ
        </button>
      </div>

      <div style={mainContent}>
        <div style={sectionWhite}>
          <div style={titleRow}>
            <span style={chapterLabel}>ตอนที่ใหม่</span>
            <input 
              type="text" 
              value={chapterTitle} 
              onChange={(e) => setChapterTitle(e.target.value)}
              style={titleInput} 
            />
          </div>

          <div style={editorContainer}>
            <div style={toolbar}>
              <div style={toolGroup}><Undo2 size={18} /><Redo2 size={18} /></div>
              <div style={divider} />
              <div style={toolGroup}><Bold size={18} /><Underline size={18} /><ImageIcon size={18} /></div>
              <div style={divider} />
              <div style={toolGroup}><AlignLeft size={18} /><AlignCenter size={18} /><AlignRight size={18} /></div>
            </div>
            <textarea 
              style={textArea} 
              placeholder="พิมพ์เนื้อหานิยาย..." 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
            />
          </div>

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
                  <span style={{color: isPublished ? '#4caf50' : '#999', fontSize: '14px', minWidth: '60px'}}>
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
                  <span style={{color: isCompleted ? '#4caf50' : '#999', fontSize: '14px', minWidth: '60px'}}>
                    {isCompleted ? 'จบแล้ว' : 'ยังไม่จบ'}
                  </span>
                </div>
              </div>
              <div style={actionButtons}>
                <button style={btnGray} onClick={() => navigate(-1)}>ยกเลิก</button>
                <button style={btnPurple} onClick={() => setShowSaveConfirm(true)}>บันทึก</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Dropdown/Modal เผยแพร่ */}
      {showPublishModal && (
        <div style={modalOverlay}>
          <div style={modalContainer}>
            <h2 style={modalTitle}>ต้องการเผยแพร่หรือไม่</h2>
            <div style={modalActionArea}>
              <button style={btnPublishNow} onClick={() => { setIsPublished(true); setShowPublishModal(false); }}>เผยแพร่เลย</button>
              <button style={btnKeepDraft} onClick={() => { setIsPublished(false); setShowPublishModal(false); }}>เป็นร่างไว้ก่อน</button>
            </div>
          </div>
        </div>
      )}

      {/*Modals */}
      {showSaveConfirm && (
        <div style={modalOverlay}>
          <div style={modalContainer}>
            <h2 style={modalTitle}>บันทึกใช่หรือไม่</h2>
            <div style={modalActionArea}>
              <button style={btnPublishNow} onClick={executeSaveData}>ตกลง</button>
              <button style={btnKeepDraft} onClick={() => setShowSaveConfirm(false)}>ยกเลิก</button>
            </div>
          </div>
        </div>
      )}

      {showSuccessOption && (
        <div style={modalOverlay}>
          <div style={modalContainer}>
            <h2 style={modalTitle}>บันทึกสำเร็จ</h2>
            <div style={modalActionArea}>
              <button style={btnPublishNow} onClick={() => navigate(-1)}>กลับหน้าหลัก</button>
              <button style={btnKeepDraft} onClick={() => {
                setShowSuccessOption(false);
                setChapterTitle(""); 
                setContent("");
              }}>เขียนต่อ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles 
const pageContainer: React.CSSProperties = { minHeight: '100vh', backgroundColor: '#f9f9f9', padding: '20px', fontFamily: "'Kanit', sans-serif" };
const headerNav = { maxWidth: '900px', margin: '0 auto 20px auto' };
const backBtn = { background: 'none', border: 'none', color: '#bc7df2', cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 'bold' };
const mainContent = { maxWidth: '900px', margin: '0 auto' };
const sectionWhite = { backgroundColor: '#fff', padding: '30px', borderRadius: '25px', border: '1px solid #f0f0f0' };
const titleRow = { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' };
const chapterLabel = { color: '#bc7df2', fontSize: '20px', fontWeight: 'bold' };
const titleInput: React.CSSProperties = { flex: 1, padding: '12px 20px', borderRadius: '15px', border: '1.5px solid #eee', fontSize: '16px' };
const editorContainer = { border: '1.5px solid #eee', borderRadius: '20px', overflow: 'hidden' };
const toolbar = { display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 20px', backgroundColor: '#f9f9f9' };
const toolGroup = { display: 'flex', gap: '12px' };
const divider = { width: '1px', height: '15px', backgroundColor: '#ddd' };
const textArea: React.CSSProperties = { width: '100%', minHeight: '400px', padding: '25px', border: 'none', outline: 'none', fontSize: '16px', resize: 'none' };
const statusRowContainer: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '20px', marginTop: '30px' };
const statusTitle = { color: '#bc7df2', fontWeight: 'bold', fontSize: '20px' };
const statusWhiteCard: React.CSSProperties = { flex: 1, backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '25px', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const toggleSection = { display: 'flex', flexDirection: 'column' as const, gap: '8px' };
const toggleItem = { display: 'flex', alignItems: 'center', gap: '15px' };
const toggleLabel = { fontSize: '14px', color: '#666', width: '80px' };
const switchBase: React.CSSProperties = { width: '42px', height: '22px', borderRadius: '20px', position: 'relative', cursor: 'pointer', transition: '0.3s' };
const switchThumb: React.CSSProperties = { width: '18px', height: '18px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', transition: '0.3s' };
const actionButtons = { display: 'flex', gap: '12px' };
const btnGray = { padding: '10px 35px', borderRadius: '15px', border: 'none', backgroundColor: '#666', color: '#fff', cursor: 'pointer', fontWeight: 'bold' };
const btnPurple = { padding: '10px 35px', borderRadius: '15px', border: 'none', backgroundColor: '#bc7df2', color: '#fff', cursor: 'pointer', fontWeight: 'bold' };

const modalOverlay: React.CSSProperties = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContainer: React.CSSProperties = { width: '400px', backgroundColor: '#fff', borderRadius: '45px', padding: '45px 35px', textAlign: 'center', border: '5px solid #bc7df2', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' };
const modalTitle = { fontSize: '26px', fontWeight: 'bold', color: '#333', marginBottom: '15px' };
const modalActionArea = { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '15px' };
const btnPublishNow: React.CSSProperties = { width: '260px', padding: '14px 0', backgroundColor: '#bc7df2', color: '#fff', border: 'none', borderRadius: '35px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' };
const btnKeepDraft: React.CSSProperties = { width: '150px', padding: '10px 0', backgroundColor: '#f2f2f2', color: '#666', border: 'none', borderRadius: '30px', fontSize: '16px', cursor: 'pointer' };

export default AddChapterNovel;
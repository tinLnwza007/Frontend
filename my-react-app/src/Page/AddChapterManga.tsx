import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Image as ImageIcon, ChevronLeft } from 'lucide-react';

const AddChapterManga = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // --- State สำหรับข้อมูลตอน ---
  const [chapterTitle, setChapterTitle] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // --- State สำหรับรูปภาพ ---
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [contentImages, setContentImages] = useState<(string | null)[]>([null]);
  
  // --- UI Control States ---
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [activeContentIndex, setActiveContentIndex] = useState<number | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showSuccessOption, setShowSuccessOption] = useState(false);

  const coverRef = useRef<HTMLDivElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInputRef = useRef<HTMLInputElement>(null);

  // ปิด Menu เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (coverRef.current && !coverRef.current.contains(event.target as Node)) {
        setShowCoverMenu(false);
      }
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setActiveContentIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ฟังก์ชันจัดการ Logic การเผยแพร่ (เหมือนนิยาย)
  const handleTogglePublish = () => {
    if (!isPublished) {
      setShowPublishModal(true);
    } else {
      setIsPublished(false);
    }
  };

  // --- Image Handling ---
  const handleSelectCoverFile = (accept: string) => {
    if (coverInputRef.current) {
      coverInputRef.current.accept = accept;
      coverInputRef.current.click();
    }
    setShowCoverMenu(false);
  };

  const onCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSelectContentFile = (accept: string) => {
    if (contentInputRef.current && activeContentIndex !== null) {
      contentInputRef.current.accept = accept;
      contentInputRef.current.click();
    }
  };

  const onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeContentIndex !== null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...contentImages];
        newImages[activeContentIndex] = reader.result as string;
        if (activeContentIndex === contentImages.length - 1) {
          newImages.push(null);
        }
        setContentImages(newImages);
        setActiveContentIndex(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Save Logic (เหมือนนิยาย) ---
  const executeSaveData = () => {
    const savedWorks = JSON.parse(localStorage.getItem('myWorks') || '[]');
    const workIndex = savedWorks.findIndex((w: any) => String(w.id) === String(id));

    if (workIndex !== -1) {
      const newChapter = {
        id: Date.now(),
        title: chapterTitle || `ตอนที่ ${savedWorks[workIndex].episodes?.length + 1 || 1}`,
        coverImage: coverImage,
        pages: contentImages.filter(img => img !== null),
        isPublished: isPublished,
        isCompleted: isCompleted,
        date: new Date().toLocaleDateString('th-TH'),
      };

      if (!savedWorks[workIndex].episodes) savedWorks[workIndex].episodes = [];
      savedWorks[workIndex].episodes.push(newChapter);
      
      localStorage.setItem('myWorks', JSON.stringify(savedWorks));
      
      setShowSaveConfirm(false);
      setShowSuccessOption(true);
    } else {
      alert("ไม่พบข้อมูลการ์ตูนเรื่องนี้");
    }
  };

  return (
    <div style={pageContainer}>
      <div style={headerNav}>
        <button onClick={() => navigate(-1)} style={backBtn}>
          <ChevronLeft size={20} /> ย้อนกลับ
        </button>
      </div>

      <div style={formWrapper}>
        {/* ส่วนที่ 1: อัปโหลดรูปปกตอน */}
        <div style={inputGroup}>
          <h2 style={sectionHeader}>กรุณาใส่รูปภาพตอน<span style={{color: '#9b67bd'}}>*</span></h2>
          <div style={{ position: 'relative', width: 'fit-content', margin: '0 auto' }} ref={coverRef}>
            <div 
              style={{
                ...uploadBoxSmall,
                backgroundImage: coverImage ? `url(${coverImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} 
              onClick={() => setShowCoverMenu(!showCoverMenu)}
            >
              {!coverImage && (
                <div style={plusIconCircle}>
                  <Plus size={40} color="#9b67bd" strokeWidth={2.5} />
                </div>
              )}
            </div>
            <input type="file" ref={coverInputRef} style={{ display: 'none' }} onChange={onCoverChange} />
            {showCoverMenu && (
              <div style={popupMenuContainer}>
                {['.jpg,.jpeg', '.png', 'image/*'].map((type, i) => (
                  <div key={i} style={menuItem} onClick={() => handleSelectCoverFile(type)}>
                    <span style={menuText}>{i === 0 ? 'ไฟล์รูปภาพ .JPG' : i === 1 ? 'ไฟล์รูปภาพ .PNG' : 'ไฟล์รูปภาพ'}</span>
                    <ImageIcon size={20} color="#000" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ส่วนที่ 2: ชื่อตอนและเนื้อหา */}
        <div style={inputGroup}>
          <div style={titleRow}>
            <span style={labelPurpleText}>ตอนใหม่</span>
            <input 
              type="text" 
              style={titleInput} 
              placeholder="ตั้งชื่อตอนของคุณที่นี่..."
              value={chapterTitle} 
              onChange={(e) => setChapterTitle(e.target.value)} 
            />
          </div>
          
          <div style={contentListContainer} ref={contentRef}>
            {contentImages.map((img, index) => (
              <div key={index} style={{ position: 'relative', width: '100%' }}>
                <div 
                  style={{
                    ...uploadBoxLarge,
                    backgroundImage: img ? `url(${img})` : 'none',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    marginBottom: '20px'
                  }} 
                  onClick={() => setActiveContentIndex(index)}
                >
                  {!img && (
                    <div style={plusIconCircle}>
                      <Plus size={50} color="#9b67bd" strokeWidth={2.5} />
                    </div>
                  )}
                </div>

                {activeContentIndex === index && (
                  <div style={{...popupMenuContainer, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', right: 'auto'}}>
                    {['.jpg,.jpeg', '.png', 'image/*'].map((type, i) => (
                      <div key={i} style={menuItem} onClick={() => handleSelectContentFile(type)}>
                        <span style={menuText}>{i === 0 ? 'ไฟล์รูปภาพ .JPG' : i === 1 ? 'ไฟล์รูปภาพ .PNG' : 'ไฟล์รูปภาพ'}</span>
                        <ImageIcon size={20} color="#000" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <input type="file" ref={contentInputRef} style={{ display: 'none' }} onChange={onContentChange} />
          </div>
        </div>

        {/* ส่วนที่ 3: สถานะและปุ่มบันทึก */}
        <div style={actionSection}>
          <div style={statusRowContainer}>
            <span style={mainStatusLabel}>เผยแพร่ :</span>
            <div style={whiteStatusBox}>
                <div style={toggleRow}>
                  <span style={toggleLabel}>สถานะเรื่อง</span>
                  <div style={switchContainer}>
                    <div style={{...switchBase, backgroundColor: isPublished ? '#4caf50' : '#ccc'}} onClick={handleTogglePublish}>
                      <div style={{...switchThumb, left: isPublished ? '18px' : '2px'}} />
                    </div>
                    <span style={{...statusText, color: isPublished ? '#4caf50' : '#999'}}>{isPublished ? 'เผยแพร่' : 'ร่าง'}</span>
                  </div>
                </div>

                <div style={toggleRow}>
                  <span style={toggleLabel}>สถานะจบ</span>
                  <div style={switchContainer}>
                    <div style={{...switchBase, backgroundColor: isCompleted ? '#4caf50' : '#ccc'}} onClick={() => setIsCompleted(!isCompleted)}>
                      <div style={{...switchThumb, left: isCompleted ? '18px' : '2px'}} />
                    </div>
                    <span style={{...statusText, color: isCompleted ? '#4caf50' : '#999'}}>{isCompleted ? 'จบแล้ว' : 'ยังไม่จบ'}</span>
                  </div>
                </div>
            </div>
          </div>
          <div style={buttonGroup}>
            <button style={cancelBtn} onClick={() => navigate(-1)}>ยกเลิก</button>
            <button style={saveBtn} onClick={() => setShowSaveConfirm(true)}>บันทึก</button>
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
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
              <button style={btnPublishNow} onClick={() => navigate(`/build-manga/${id}`)}>กลับหน้าหลัก</button>
              <button style={btnKeepDraft} onClick={() => {
                setShowSuccessOption(false);
                setChapterTitle(""); 
                setCoverImage(null);
                setContentImages([null]);
              }}>เพิ่มตอนต่อไป</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Styles (ผสมผสาน Manga + Novel) ---
const pageContainer: React.CSSProperties = { minHeight: '100vh', backgroundColor: '#f9f9f9', padding: '20px', fontFamily: "'Kanit', sans-serif" };
const headerNav = { maxWidth: '700px', margin: '0 auto 20px auto' };
const backBtn = { background: 'none', border: 'none', color: '#bc7df2', cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 'bold' };
const formWrapper: React.CSSProperties = { backgroundColor: '#fff', borderRadius: '30px', padding: '40px', width: '100%', maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '35px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' };
const inputGroup = { display: 'flex', flexDirection: 'column' as const, gap: '15px' };
const sectionHeader = { fontSize: '24px', color: '#9b67bd', margin: '0 0 10px 0', textAlign: 'center' as const };
const uploadBoxSmall: React.CSSProperties = { width: '450px', height: '180px', backgroundColor: '#f1f1f1', borderRadius: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', overflow: 'hidden', border: '2px dashed #ccc' };
const contentListContainer = { display: 'flex', flexDirection: 'column' as const, width: '100%' };
const uploadBoxLarge: React.CSSProperties = { width: '100%', height: '550px', backgroundColor: '#f1f1f1', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', overflow: 'hidden', border: '1px solid #eee' };
const popupMenuContainer: React.CSSProperties = { position: 'absolute', top: '30px', right: '-180px', backgroundColor: '#666666', borderRadius: '25px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', zIndex: 10, width: '220px' };
const menuItem: React.CSSProperties = { backgroundColor: '#f1f1f1', borderRadius: '20px', padding: '8px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' };
const menuText = { color: '#9b67bd', fontSize: '14px', fontWeight: '500' };
const plusIconCircle = { width: '60px', height: '60px', borderRadius: '50%', border: '3px solid #9b67bd', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' };
const titleRow = { display: 'flex', alignItems: 'center', gap: '15px' };
const labelPurpleText = { color: '#9b67bd', fontSize: '22px', fontWeight: 'bold' };
const titleInput = { flex: 1, height: '45px', borderRadius: '12px', border: '1.5px solid #eee', backgroundColor: '#fff', outline: 'none', padding: '0 15px', fontSize: '16px' };
const actionSection = { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '35px', marginTop: '10px' };
const statusRowContainer = { display: 'flex', alignItems: 'center', gap: '15px', width: '100%', justifyContent: 'center' };
const mainStatusLabel = { color: '#9b67bd', fontSize: '22px', fontWeight: 'bold' };
const whiteStatusBox: React.CSSProperties = { backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '25px', padding: '20px 30px', display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '380px' };
const toggleRow = { display: 'flex', alignItems: 'center', justifyContent: 'space-between' };
const toggleLabel = { fontSize: '15px', color: '#666' };
const switchContainer = { display: 'flex', alignItems: 'center', gap: '20px' };
const switchBase: React.CSSProperties = { width: '38px', height: '20px', borderRadius: '15px', position: 'relative', cursor: 'pointer', transition: '0.3s' };
const switchThumb: React.CSSProperties = { width: '16px', height: '16px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', transition: '0.3s' };
const statusText = { fontSize: '14px', width: '50px', textAlign: 'left' as const };
const buttonGroup = { display: 'flex', gap: '30px' };
const cancelBtn = { padding: '12px 50px', borderRadius: '25px', border: 'none', backgroundColor: '#666', color: '#fff', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' };
const saveBtn = { padding: '12px 50px', borderRadius: '25px', border: 'none', backgroundColor: '#bc7df2', color: '#fff', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' };

const modalOverlay: React.CSSProperties = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContainer: React.CSSProperties = { width: '400px', backgroundColor: '#fff', borderRadius: '45px', padding: '45px 35px', textAlign: 'center', border: '5px solid #bc7df2' };
const modalTitle = { fontSize: '26px', fontWeight: 'bold', color: '#333', marginBottom: '25px' };
const modalActionArea = { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '15px' };
const btnPublishNow: React.CSSProperties = { width: '260px', padding: '14px 0', backgroundColor: '#bc7df2', color: '#fff', border: 'none', borderRadius: '35px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' };
const btnKeepDraft: React.CSSProperties = { width: '150px', padding: '10px 0', backgroundColor: '#f2f2f2', color: '#666', border: 'none', borderRadius: '30px', fontSize: '16px', cursor: 'pointer' };

export default AddChapterManga;
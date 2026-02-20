import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Bold, Italic, Underline, 
  Image as ImageIcon,
  Undo2, Redo2, ChevronLeft
} from 'lucide-react';

const CreateNovel = () => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showUploadDropdown, setShowUploadDropdown] = useState(false);
  
  const uploadRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (uploadRef.current && !uploadRef.current.contains(event.target as Node)) {
        setShowUploadDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ฟังก์ชันเลือกไฟล์ตามประเภทที่กำหนด
  const handleSelectFile = (accept: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = accept;
      fileInputRef.current.click();
    }
    setShowUploadDropdown(false);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert("กรุณาระบุชื่อเรื่องก่อนบันทึก");
      return;
    }

    const novelId = Date.now().toString();
    const newWork = {
      id: novelId,
      title: title,
      description: description,
      image: previewImage || '',
      status: isPublished ? 'published' : 'draft',
      isCompleted: isCompleted,
      type: 'novel',
      createdAt: new Date().toISOString()
    };

    const existingWorks = JSON.parse(localStorage.getItem('myWorks') || '[]');
    const updatedWorks = [newWork, ...existingWorks];
    localStorage.setItem('myWorks', JSON.stringify(updatedWorks));

    alert("สร้างนิยายเรื่องใหม่สำเร็จ!"); 
    navigate('/writing');
  };

  const handleTogglePublish = () => {
    if (!isPublished) setShowPublishModal(true);
    else setIsPublished(false);
  };

  return (
    <div style={pageContainer}>
      <div style={headerNav}>
        <button onClick={() => navigate('/writing')} style={backBtn}>
          <ChevronLeft size={20} /> ย้อนกลับ
        </button>
      </div>

      <div style={mainContent}>
        <div style={sectionWhite}>
          <div style={flexRow}>
            <div style={{ position: 'relative' }} ref={uploadRef}>
              <div 
                style={{
                  ...coverBox, 
                  backgroundImage: previewImage ? `url(${previewImage})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: previewImage ? 'none' : '2px dashed #bc7df2'
                }} 
                onClick={() => setShowUploadDropdown(!showUploadDropdown)}
              >
                {!previewImage && (
                  <div style={plusWrapper}>
                    <div style={plusCircle}><Plus size={30} color="#bc7df2" /></div>
                    <span style={uploadHint}>อัพโหลดรูปปก</span>
                  </div>
                )}
              </div>
              
              <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={onFileChange} />
              
              {/* ปรับ Dropdown ให้มีตัวเลือกไฟล์ */}
              {showUploadDropdown && (
                <div style={darkDropdown}>
                  <div style={menuItem} onClick={() => handleSelectFile('.jpg,.jpeg')}>
                    <span>ไฟล์รูปภาพ .JPG</span> <ImageIcon size={18} />
                  </div>
                  <div style={menuItem} onClick={() => handleSelectFile('.png')}>
                    <span>ไฟล์รูปภาพ .PNG</span> <ImageIcon size={18} />
                  </div>
                  <div style={{...menuItem, border: 'none'}} onClick={() => handleSelectFile('image/*')}>
                    <span>ไฟล์รูปภาพ</span> <ImageIcon size={18} />
                  </div>
                </div>
              )}
            </div>

            <div style={inputArea}>
              <div style={fieldGroup}>
                <label style={purpleLabel}>ชื่อเรื่อง*</label>
                <input 
                  type="text" 
                  placeholder="พิมพ์ชื่อเรื่องที่นี่" 
                  style={textInput} 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div style={fieldGroup}>
                <label style={purpleLabel}>เรื่องย่อ</label>
                <input type="text" placeholder="ระบุเรื่องย่อ" style={textInput} />
              </div>
            </div>
          </div>
        </div>

        <div style={{...sectionWhite, marginTop: '20px'}}>
          <label style={purpleLabel}>แนะนำเรื่อง*</label>
          <div style={editorWrapper}>
            <div style={toolbar}>
               <Undo2 size={18} /> <Redo2 size={18} />
               <div style={divider} />
               <Bold size={18} /> <Italic size={18} /> <Underline size={18} />
            </div>
            <textarea 
              placeholder="เขียนคำโปรยให้น่าติดตาม..." 
              style={editorArea} 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div style={statusRowContainer}>
            <span style={statusTitle}>เผยแพร่ :</span>
            <div style={statusWhiteCard}>
              <div style={toggleSection}>
                <div style={toggleItem}>
                  <span style={toggleLabel}>สถานะเรื่อง</span>
                  <div onClick={handleTogglePublish} style={{...switchBase, backgroundColor: isPublished ? '#4caf50' : '#ddd'}}>
                    <div style={{...switchThumb, left: isPublished ? '22px' : '2px'}} />
                  </div>
                  <span style={{ color: isPublished ? '#4caf50' : '#999', fontSize: '14px', minWidth: '60px' }}>{isPublished ? 'เผยแพร่' : 'ร่าง'}</span>
                </div>
                <div style={toggleItem}>
                  <span style={toggleLabel}>สถานะจบ</span>
                  <div onClick={() => setIsCompleted(!isCompleted)} style={{...switchBase, backgroundColor: isCompleted ? '#4caf50' : '#ddd'}}>
                    <div style={{...switchThumb, left: isCompleted ? '22px' : '2px'}} />
                  </div>
                  <span style={{ color: isCompleted ? '#4caf50' : '#999', fontSize: '14px', minWidth: '60px' }}>{isCompleted ? 'จบแล้ว' : 'ยังไม่จบ'}</span>
                </div>
              </div>
              <div style={actionButtons}>
                <button style={btnGray} onClick={() => navigate('/writing')}>ยกเลิก</button>
                <button style={btnPurple} onClick={handleSave}>บันทึกและสร้างเรื่อง</button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
};

// Styles 
const pageContainer: React.CSSProperties = { minHeight: '100vh', backgroundColor: '#f9f9f9', fontFamily: "'Kanit', sans-serif", padding: '20px' };
const headerNav = { maxWidth: '900px', margin: '0 auto 20px auto' };
const backBtn = { background: 'none', border: 'none', color: '#bc7df2', cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '16px' };
const mainContent = { maxWidth: '900px', margin: '0 auto' };
const sectionWhite = { backgroundColor: '#fff', padding: '30px', borderRadius: '25px', border: '1px solid #f0f0f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' };
const flexRow = { display: 'flex', gap: '40px' };
const coverBox: React.CSSProperties = { width: '240px', height: '320px', backgroundColor: '#fdfdfd', borderRadius: '40px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' };
const plusWrapper = { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '10px' };
const plusCircle = { width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #bc7df2', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const uploadHint = { color: '#bc7df2', fontSize: '14px', fontWeight: 'bold' };
const darkDropdown: React.CSSProperties = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '220px', backgroundColor: '#444', borderRadius: '30px', padding: '15px', zIndex: 100 };
const menuItem: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', backgroundColor: '#fff', borderRadius: '20px', marginBottom: '8px', cursor: 'pointer', color: '#bc7df2', fontWeight: 'bold', fontSize: '14px' };
const inputArea = { flex: 1, display: 'flex', flexDirection: 'column' as const, gap: '20px' };
const fieldGroup = { display: 'flex', flexDirection: 'column' as const, gap: '8px' };
const purpleLabel = { color: '#bc7df2', fontWeight: 'bold', fontSize: '18px' };
const textInput = { padding: '15px 20px', borderRadius: '15px', border: '1.5px solid #eee', outline: 'none', fontSize: '16px' };
const editorWrapper = { border: '1.5px solid #eee', borderRadius: '20px', overflow: 'hidden', marginTop: '10px' };
const toolbar = { display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 20px', backgroundColor: '#f9f9f9', borderBottom: '1px solid #eee' };
const divider = { width: '1px', height: '15px', backgroundColor: '#ddd' };
const editorArea = { width: '100%', minHeight: '200px', padding: '20px', border: 'none', outline: 'none', fontSize: '16px', resize: 'none' as const };

const statusRowContainer: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '20px', marginTop: '30px' };
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
const modalContainer: React.CSSProperties = { width: '400px', backgroundColor: '#fff', borderRadius: '45px', padding: '45px 35px', textAlign: 'center', border: '5px solid #bc7df2', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' };
const modalTitle = { fontSize: '26px', fontWeight: 'bold', color: '#333', marginBottom: '15px' };
const modalActionArea = { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '15px' };
const btnPublishNow: React.CSSProperties = { width: '260px', padding: '14px 0', backgroundColor: '#bc7df2', color: '#fff', border: 'none', borderRadius: '35px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' };
const btnKeepDraft: React.CSSProperties = { width: '150px', padding: '10px 0', backgroundColor: '#f2f2f2', color: '#666', border: 'none', borderRadius: '30px', fontSize: '16px', cursor: 'pointer' };

export default CreateNovel;
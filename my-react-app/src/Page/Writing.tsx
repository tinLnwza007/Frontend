import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Image as ImageIcon, Trash2, ChevronDown, ChevronUp, ChevronLeft } from 'lucide-react';

const Writing = () => {
  const navigate = useNavigate();
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState<'novel' | 'manga' | null>(null);
  const [showManageDropdown, setShowManageDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'นิยาย' | 'การ์ตูน'>('นิยาย');
  const [works, setWorks] = useState<any[]>([]);

  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const manageDropdownRef = useRef<HTMLDivElement>(null);

  // ดึงข้อมูลจาก localStorage เมื่อโหลดหน้า
  useEffect(() => {
    const savedWorks = JSON.parse(localStorage.getItem('myWorks') || '[]');
    setWorks(savedWorks);

    const handleClickOutside = (event: MouseEvent) => {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) setShowTypeDropdown(false);
      if (manageDropdownRef.current && !manageDropdownRef.current.contains(event.target as Node)) setShowManageDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ฟังก์ชันลบผลงาน
  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // ป้องกันไม่ให้คลิกแล้วไปหน้า build
    if (window.confirm("ต้องการลบผลงานนี้ใช่หรือไม่?")) {
      const updated = works.filter(w => w.id !== id);
      setWorks(updated);
      localStorage.setItem('myWorks', JSON.stringify(updated));
    }
  };

  // ฟังก์ชันเมื่อคลิกที่รายการ เพื่อไปยังหน้า Build ตามประเภท
  const handleWorkClick = (work: any) => {
    if (work.type === 'manga') {
      navigate(`/build-manga/${work.id}`);
    } else {
      navigate(`/build-novel/${work.id}`);
    }
  };

  // กรองรายการตามหมวดที่เลือก (นิยาย/การ์ตูน)
  const displayWorks = works.filter(w => 
    activeCategory === 'นิยาย' ? w.type === 'novel' : w.type === 'manga'
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 30px', fontFamily: "'Kanit', sans-serif" }}>
      <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', gap: '8px', marginBottom: '20px' }}>
        <ChevronLeft size={28} color="#bc7df2" />
        <span style={{ color: '#bc7df2', fontSize: '20px', fontWeight: '500' }}>ย้อนกลับ</span>
      </button>

      <h2 style={{ fontSize: '42px', color: '#9b67bd', fontWeight: 'bold', marginBottom: '40px' }}>Writing ✎</h2>

      <div style={{ backgroundColor: '#f8f8f8', borderRadius: '25px', padding: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <div style={{ borderBottom: '1px solid #eee', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '24px', margin: '0 0 15px 0' }}>จัดการงานเขียน</h3>
        </div>

        <div style={{ backgroundColor: '#efefef', borderRadius: '20px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
             <div style={{ position: 'relative' }} ref={manageDropdownRef}>
                <button 
                  onClick={() => setShowManageDropdown(!showManageDropdown)}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 25px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', color: showManageDropdown ? '#9b67bd' : '#000' }}
                >
                  {activeCategory} {showManageDropdown ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {showManageDropdown && (
                  <div style={{ position: 'absolute', top: '110%', left: 0, width: '180px', backgroundColor: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', borderRadius: '15px', zIndex: 20, overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                    <div onClick={() => { setActiveCategory('นิยาย'); setShowManageDropdown(false); }} style={{ padding: '15px 20px', fontSize: '16px', color: '#9b67bd', cursor: 'pointer', borderBottom: '1px solid #f9f9f9' }}>นิยาย</div>
                    <div onClick={() => { setActiveCategory('การ์ตูน'); setShowManageDropdown(false); }} style={{ padding: '15px 20px', fontSize: '16px', color: '#9b67bd', cursor: 'pointer' }}>การ์ตูน</div>
                  </div>
                )}
             </div>
             <span style={{ fontSize: '16px', color: '#777', fontWeight: '500' }}>ทั้งหมด ( {displayWorks.length} ) เรื่อง</span>
          </div>

          {displayWorks.length > 0 ? displayWorks.map((work) => (
            <div 
              key={work.id} 
              onClick={() => handleWorkClick(work)} 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '15px 20px', borderRadius: '15px', marginBottom: '15px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '50px', 
                  height: '70px', 
                  borderRadius: '8px', 
                  marginRight: '20px', 
                  backgroundImage: work.image ? `url(${work.image})` : 'none', // รองรับชื่อ property 'image' จาก CreateManga/Novel
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center', 
                  backgroundColor: '#ddd' 
                }}></div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>{work.title}</span>
                  <span style={{ fontSize: '14px', color: '#888' }}>โดย {work.author}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: (work.status === 'published' || work.isPublished) ? '#4caf50' : '#999' 
                }}>
                  {(work.status === 'published' || work.isPublished) ? 'เผยแพร่แล้ว' : 'แบบร่าง'}
                </span>
                <button onClick={(e) => handleDelete(work.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '5px' }}>
                  <Trash2 size={22} color="#ff4d4f" />
                </button>
              </div>
            </div>
          )) : (
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fff', borderRadius: '15px', color: '#888', padding: '50px', fontSize: '18px' }}>
              ไม่มีรายการ{activeCategory}ในขณะนี้
            </div>
          )}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '70px', position: 'relative' }}>
        {showTypeDropdown && (
          <div ref={typeDropdownRef} style={{ position: 'absolute', bottom: '110px', left: '50%', transform: 'translateX(-50%)', width: '420px', backgroundColor: '#fff', padding: '35px', borderRadius: '35px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', zIndex: 100, border: '1px solid #eee' }}>
            <h3 style={{ marginBottom: '25px', fontSize: '24px' }}>+ เริ่มงานเขียนใหม่</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div 
                onClick={() => setSelectedType('novel')} 
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 15px', border: '3px solid', borderRadius: '25px', cursor: 'pointer', gap: '15px', transition: '0.3s', borderColor: selectedType === 'novel' ? '#9b67bd' : '#eee', backgroundColor: selectedType === 'novel' ? '#fcf8ff' : '#fff' }}
              >
                <Book color="#9b67bd" size={36} /> <span style={{ fontSize: '20px', fontWeight: '600' }}>นิยาย</span>
              </div>
              <div 
                onClick={() => setSelectedType('manga')} 
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 15px', border: '3px solid', borderRadius: '25px', cursor: 'pointer', gap: '15px', transition: '0.3s', borderColor: selectedType === 'manga' ? '#9b67bd' : '#eee', backgroundColor: selectedType === 'manga' ? '#fcf8ff' : '#fff' }}
              >
                <ImageIcon color="#13c2c2" size={36} /> <span style={{ fontSize: '20px', fontWeight: '600' }}>มังงะ</span>
              </div>
            </div>
            <button 
              disabled={!selectedType} 
              onClick={() => { if (selectedType === 'novel') navigate('/create-novel'); else navigate('/create-manga'); }} 
              style={{ width: '100%', padding: '18px', borderRadius: '40px', border: 'none', color: '#fff', fontWeight: 'bold', fontSize: '20px', cursor: 'pointer', backgroundColor: selectedType ? '#9b67bd' : '#ccc' }}
            >ตกลง</button>
          </div>
        )}
        <button 
          onClick={() => setShowTypeDropdown(!showTypeDropdown)} 
          style={{ backgroundColor: '#bc7df2', color: '#fff', border: 'none', padding: '20px 70px', borderRadius: '50px', fontSize: '24px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 20px rgba(188, 125, 242, 0.3)' }}
        >
          {showTypeDropdown ? 'ปิดหน้าต่าง' : 'เพิ่มงานเขียน'}
        </button>
      </div>
    </div>
  );
};

export default Writing;
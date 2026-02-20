import React, { useState } from 'react';
import { Send, User, Heart } from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  text: string;
  chapter: string;
}

interface Props {
  currentChapterTitle: string;
}

const CommentSection: React.FC<Props> = ({ currentChapterTitle }) => {
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    { 
      id: 1, 
      user: "นักอ่านหมายเลข 1", 
      text: "สนุกมากๆ เลยค่ะ มาต่ออีกเรื่อยๆ นะคะ", 
      chapter: "บทที่ 0 | Prologue" 
    }
  ]);

  const handleSend = () => {
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: Date.now(),
      user: `นักอ่านหมายเลข ${comments.length + 1}`,
      text: commentText,
      chapter: currentChapterTitle
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  return (
    <div style={{ fontFamily: "'Kanit', sans-serif", marginTop: '40px' }}>
      {/* จำนวนความคิดเห็น */}
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
        ความคิดเห็น ({comments.length})
      </h3>

      {/* ช่องกรอกข้อมูล */}
      <div style={{ marginBottom: '25px' }}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="เพิ่มความคิดเห็นที่นี่"
          style={textareaStyle}
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
          <button onClick={handleSend} style={sendBtnStyle}>
            <Send size={18} />
            <span>ส่งความคิดเห็น</span>
          </button>

          <div onClick={() => setIsLiked(!isLiked)} style={likeBtnStyle}>
            <span style={{ color: '#ff4d4f', fontWeight: '500' }}>ถูกใจเรื่องนี้</span>
            <Heart 
              size={24} 
              color="#ff4d4f" 
              fill={isLiked ? "#ff4d4f" : "none"} 
              style={{ transition: '0.2s' }} 
            />
          </div>
        </div>
      </div>

      {/* รายการคอมเมนต์ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {comments.map((item) => (
          <div key={item.id} style={commentBoxStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#999' }}>จากตอนที่ "{item.chapter}"</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>{item.user}</span>
                <div style={avatarCircle}><User size={16} color="#666" /></div>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '16px', color: '#333', lineHeight: '1.5' }}>{item.text}</p>
          </div>
        ))}
      </div>

      {/* ปุ่มดูเพิ่มเติม */}
      <button style={loadMoreBtn}>ดู {comments.length} ความคิดเห็นเพิ่ม</button>
    </div>
  );
};

// Styles
const textareaStyle: React.CSSProperties = {
  width: '100%', minHeight: '120px', padding: '15px', borderRadius: '12px',
  border: '1px solid #eee', fontSize: '16px', fontFamily: 'inherit', outline: 'none'
};
const sendBtnStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#c084fc',
  color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '25px',
  fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'
};
const likeBtnStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'
};
const commentBoxStyle: React.CSSProperties = {
  backgroundColor: '#f8f8f8', padding: '18px', borderRadius: '12px'
};
const avatarCircle: React.CSSProperties = {
  width: '28px', height: '28px', backgroundColor: '#ddd', borderRadius: '50%',
  display: 'flex', justifyContent: 'center', alignItems: 'center'
};
const loadMoreBtn: React.CSSProperties = {
  width: '100%', padding: '12px', marginTop: '15px', backgroundColor: '#eee',
  border: 'none', borderRadius: '8px', color: '#666', cursor: 'pointer'
};

export default CommentSection;
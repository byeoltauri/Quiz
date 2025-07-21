import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminMainPage({ onLogout }) {
  const [selected, setSelected] = useState(1);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/get_main_image').then(res => {
      setMainImage(res.data.filename);
    });
  }, []);

  useEffect(() => {
    // 문제 불러오기
    axios.get(`http://localhost:5000/get_problem/${selected}`)
      .then(res => {
        const data = res.data;
        if (data) {
          setQuestion(data.question || '');
          setAnswer(data.answer || '');
          setLink(data.link || '');
          setImage(null); // 새로 업로드하지 않았다는 의미로 초기화
          setImageFileName(data.image || '');
        }
      })
      .catch(() => {
        setQuestion('');
        setAnswer('');
        setLink('');
        setImage(null);
        setImageFileName('');
      });
  }, [selected]);

  const uploadMainImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    await axios.post('http://localhost:5000/upload_main_image', formData);
    alert('메인 이미지 업로드 완료');
    setMainImage(file.name);
  };

  const uploadProblem = async () => {
    const formData = new FormData();
    formData.append('question', question);
    formData.append('answer', answer);
    formData.append('link', link);
    if (image) formData.append('image', image);

    await axios.post(`http://localhost:5000/upload_problem/${selected}`, formData);
    alert(`${selected}번 문제 저장 완료`);
    if (image) setImageFileName(image.name);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Admin 페이지</h1>
      <button onClick={onLogout} style={styles.logout}>로그아웃</button>

      <div style={styles.section}>
        <h2>메인 이미지 업로드</h2>
        <input type="file" onChange={uploadMainImage} />
        {mainImage && <img src={`http://localhost:5000/uploads/${mainImage}`} alt="Main" width="150" />}
      </div>

      <div style={styles.section}>
        <h2>문제 작성</h2>
        <select value={selected} onChange={(e) => setSelected(Number(e.target.value))}>
          {Array.from({ length: 25 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}번 문제</option>)}
        </select>
        <textarea placeholder="문제 질문" value={question} onChange={(e) => setQuestion(e.target.value)} style={styles.textarea} />
        <textarea placeholder="문제 정답" value={answer} onChange={(e) => setAnswer(e.target.value)} style={styles.textarea} />
        <input type="file" onChange={(e) => {
          setImage(e.target.files[0]);
          setImageFileName(e.target.files[0]?.name || '');
        }} />
        {imageFileName && <div style={styles.filename}>선택된 이미지: {imageFileName}</div>}
        <input placeholder="관련 링크" value={link} onChange={(e) => setLink(e.target.value)} style={styles.input} />
        <button onClick={uploadProblem} style={styles.button}>저장</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    fontFamily: 'Nanum Gothic',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh'
  },
  header: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#1D3557',
  },
  logout: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: '8px 16px',
    backgroundColor: '#e63946',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  section: {
    marginBottom: '40px',
  },
  textarea: {
    width: '100%',
    height: '100px',
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginTop: '10px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#457b9d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    marginTop: '10px',
    cursor: 'pointer'
  },
  filename: {
    marginTop: '6px',
    fontSize: '14px',
    color: '#333'
  }
};

export default AdminMainPage;

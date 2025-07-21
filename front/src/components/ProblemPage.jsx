import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function ProblemPage({ problemId, onBack }) {
  const [data, setData] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const indexRef = useRef(0);
  const intervalRef = useRef(null);
  const textDisplayRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/get_problem/${problemId}`).then(res => setData(res.data));

    axios.get('http://localhost:5000/get_main_image')
      .then(res => {
        const mainImageFilename = res.data.filename;
        if (mainImageFilename) {
          document.querySelector(".left").style.backgroundImage =
            `url(http://localhost:5000/static/uploads/${mainImageFilename})`;
        }
      });
  }, [problemId]);

  const start = () => {
    if (!data?.question || isRunning || indexRef.current >= data.question.length) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      if (indexRef.current < data.question.length) {
        textDisplayRef.current.innerText += data.question[indexRef.current];
        indexRef.current++;
      } else {
        clearInterval(intervalRef.current);
        setIsRunning(false);
      }
    }, 200);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const next = () => {
    if (textDisplayRef.current) textDisplayRef.current.innerText = "";
  };

  const showAnswer = () => {
    if (!data) return;
    if (textDisplayRef.current) {
      textDisplayRef.current.innerText = data.question + "\n\n" + (data.answer || '');
    }
    indexRef.current = data.question.length;
    clearInterval(intervalRef.current);
    setIsRunning(false);

    if (data.image) {
      document.querySelector(".left").style.backgroundImage = `url(http://localhost:5000/uploads/${data.image})`;
    }
     if (linkRef.current) {
      if (data.link && data.link.trim() !== "") {
        linkRef.current.href = data.link;
        linkRef.current.innerText = data.link;
        linkRef.current.style.display = 'block';
      } else {
        linkRef.current.style.display = 'none';
      }
    }
  };

  if (!data) return <div style={{ padding: 40 }}>문제를 불러오는 중...</div>;

  return (
    <div style={styles.wrapper}>
      <div className="left" style={styles.left}></div>
      <div style={styles.right}>
        <div ref={textDisplayRef} style={styles.text}></div>
        <div style={styles.buttons}>
          <button style={{ ...styles.btn, backgroundColor: 'skyblue' }} onClick={start}>시작</button>
          <button style={{ ...styles.btn, backgroundColor: 'salmon' }} onClick={stop}>중단</button>
          <button style={{ ...styles.btn, backgroundColor: 'greenyellow' }} onClick={next}>다음</button> 
        </div>
        <br></br>
        <div>
          <button style={{ ...styles.btn, backgroundColor: 'plum' }} onClick={showAnswer}>정답</button>
        </div>
        <a ref={linkRef} onClick={(e) => e.preventDefault()} style={{ display: 'none', marginTop: '20px', color: 'blue' }}></a>
        <button onClick={onBack} style={styles.back}>← 돌아가기</button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Nanum Gothic',
    margin: 0,
    padding: 0,
  },
  left: {
    width: '40%',
    height: '100vh',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    transition: 'background-image 1s ease',
  },
  right: {
    width: '60%',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa'
  },
  text: {
    fontSize: '40px',
    fontWeight: 900,
    minHeight: '50px',
    whiteSpace: 'pre-wrap',
    color: '#1D3557',
    textShadow: '3px 3px 10px rgba(0, 0, 0, 0.5)',
    letterSpacing: '2px'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px'
  },
  btn: {
    fontSize: '18px',
    fontWeight: 900,
    padding: '10px 20px',
    color: 'cornsilk',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  back: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#adb5bd',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer'
  }
};

export default ProblemPage;

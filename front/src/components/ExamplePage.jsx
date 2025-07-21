import React, { useRef, useState, useEffect } from 'react';
import axios from "axios";
import exampleImage from '../assets/images/세얼간이.png';

const EXAMPLE_QUESTION = `기록, 분석, 요약, 정리하거나 정보를 분석하고 설명하는데 그림은 있기도 하고 없기도 하고 종이로 묶여있는데 커버는 있기도 하고 없기도 하다. 머리말, 개요, 목차, 색인이 있고 인간의 계몽, 교육, 이해를 위해 만들어졌으며 시각기관을 통해 전달되며 감동을 주는 것은 무엇일까?`;
const EXAMPLE_ANSWER = '책';

function ExamplePage({ onBack }) {
  const [text, setText] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const indexRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:5000/get_main_image')
      .then(res => {
        const mainImageFilename = res.data.filename;
        if (mainImageFilename) {
          document.querySelector(".left").style.backgroundImage =
            `url(http://localhost:5000/static/uploads/${mainImageFilename})`;
        }
      });
  }, []);

  const start = () => {
    if (isRunning || indexRef.current >= EXAMPLE_QUESTION.length) return;

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      if (indexRef.current < EXAMPLE_QUESTION.length) {
        const nextChar = EXAMPLE_QUESTION[indexRef.current];
        setText(prev => prev + nextChar);
        indexRef.current += 1;
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
    setText('');
  };

  const showAnswer = () => {
    setText(EXAMPLE_QUESTION + '\n\n' + EXAMPLE_ANSWER);
    document.querySelector('.left').style.backgroundImage = `url(${exampleImage})`;

    const youtube = document.createElement('iframe');
    youtube.width = '0';
    youtube.height = '0';
    youtube.src = 'https://youtu.be/wekt7kNeK5c?t=47';
    youtube.frameBorder = '0';
    youtube.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    youtube.allowFullscreen = true;

    const container = document.getElementById('youtube-container');
    container.innerHTML = '';
    container.appendChild(youtube);

    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  return (
    <div style={styles.wrapper}>
      <div className="left" style={styles.left}></div>
      <div style={styles.right}>
        <div style={styles.text}>{text}</div>
        <div style={styles.buttons}>
          <button style={{ ...styles.btn, backgroundColor: 'skyblue' }} onClick={start}>시작</button>
          <button style={{ ...styles.btn, backgroundColor: 'salmon' }} onClick={stop}>중단</button>
          <button style={{ ...styles.btn, backgroundColor: 'greenyellow' }} onClick={next}>다음</button>
        </div>
        <br />
        <div>
          <button style={{ ...styles.btn, backgroundColor: 'plum' }} onClick={showAnswer}>정답</button>
        </div>
        <div id="youtube-container" />
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
  },
  left: {
    width: '40%',
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
    fontSize: '24px',
    minHeight: '120px',
    whiteSpace: 'pre-wrap',
    color: '#1D3557'
  },
  buttons: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px'
  },
  btn: {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
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

export default ExamplePage;

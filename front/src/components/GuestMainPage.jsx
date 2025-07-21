import React from 'react';

function GuestMainPage({ onSelectProblem, onExample, onLogout }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Guest 메인 페이지</h1>
      <button onClick={onLogout} style={styles.logout}>로그아웃</button>

      <div style={styles.section}>
        <h2 style={styles.title}>문제 선택</h2>
        <div style={styles.grid}>
          {Array.from({ length: 25 }, (_, i) => (
            <button key={i + 1} style={styles.card} onClick={() => onSelectProblem(i + 1)}>
              {i + 1}번 문제
            </button>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.title}>기타</h2>
        <div style={styles.extraButtons}>
          <button style={styles.extra} onClick={onExample}>예시문제</button>
          <button style={styles.extra} onClick={() => window.open('https://youtu.be/rTSR1nV9HJ8?t=28', '_blank')}>퀴즈설명</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    fontFamily: 'Nanum Gothic',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
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
  title: {
    fontSize: '20px',
    marginBottom: '10px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)', 
    gap: '12px',
    maxWidth: '600px',
  },
  card: {
    padding: '16px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    cursor: 'pointer',
    textAlign: 'center', 
    transition: 'background-color 0.3s, transform 0.2s',
  },
  cardHover: {
    backgroundColor: '#f1f1f1'
  },
  extraButtons: {
    display: 'flex',
    gap: '10px'
  },
  extra: {
    padding: '10px 20px',
    backgroundColor: '#457b9d',
    color: 'white',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer'
  }
};

export default GuestMainPage;
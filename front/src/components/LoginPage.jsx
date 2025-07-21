import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [input, setInput] = useState('');

  const handleLogin = () => {
    const value = input.trim().toLowerCase();
    if (value === 'admin' || value === 'guest') {
      onLogin(value);
    } else {
      alert('정확하게 입력해주세요 (admin 또는 guest)');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>QUIZ 로그인</h1>
        <input
          placeholder="admin 또는 guest 입력"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>로그인</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: 'white',
    padding: '40px 60px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#1D3557',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '250px',
    marginBottom: '20px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 30px',
    fontSize: '16px',
    backgroundColor: '#457b9d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  }
};

export default LoginPage;

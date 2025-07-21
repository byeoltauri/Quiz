import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import AdminMainPage from './components/AdminMainPage';
import GuestMainPage from './components/GuestMainPage';
import ProblemPage from './components/ProblemPage';
import ExamplePage from './components/ExamplePage';

function App() {
  const [userType, setUserType] = useState(null);
  const [view, setView] = useState('main'); // main | problem | example
  const [selectedProblem, setSelectedProblem] = useState(null);

  if (!userType) return <LoginPage onLogin={setUserType} />;

  if (userType === 'admin') {
    return <AdminMainPage onLogout={() => setUserType(null)} />;
  }

  if (userType === 'guest') {
    if (view === 'main') return <GuestMainPage onSelectProblem={(id) => { setSelectedProblem(id); setView('problem'); }} onExample={() => setView('example')} onLogout={() => setUserType(null)} />;
    if (view === 'problem') return <ProblemPage problemId={selectedProblem} onBack={() => setView('main')} />;
    if (view === 'example') return <ExamplePage onBack={() => setView('main')} />;
  }
  return <div>페이지를 불러올 수 없습니다.</div>
}

export default App;
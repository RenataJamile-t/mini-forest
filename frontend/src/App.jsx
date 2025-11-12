import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SessionForm from './components/SessionForm';
import SessionList from './components/SessionList';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export default function App() {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);

  async function fetchSessions() {
    try {
      const res = await axios.get(`${API}/sessions`);
      setSessions(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchSessions();
  }, []);

  const addSession = async (data) => {
    try {
      const res = await axios.post(`${API}/sessions`, data);
      setSessions(prev => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSession = async (id) => {
    try {
      await axios.delete(`${API}/sessions/${id}`);
      setSessions(prev => prev.filter(s => s.id !== id));
      if (activeSession?.id === id) setActiveSession(null);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDone = async (id, done) => {
    try {
      const res = await axios.put(`${API}/sessions/${id}`, { done: done ? 1 : 0 });
      setSessions(prev => prev.map(s => s.id === id ? res.data : s));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Mini-Forest 🌿</h1>
        <p className="subtitle">Foca, respira e planta sua concentração</p>
      </header>

      <main>
        <div className="left">
          <SessionForm addSession={addSession} />
          <SessionList
            sessions={sessions}
            onDelete={deleteSession}
            onStart={setActiveSession}
            onToggleDone={toggleDone}
            activeSession={activeSession}
          />
        </div>

        <div className="right">
          {activeSession ? (
            <Timer session={activeSession} onFinish={() => {
              toggleDone(activeSession.id, true);
              setActiveSession(null);
            }} />
          ) : (
            <div className="placeholder">Selecione uma sessão pra começar o timer</div>
          )}
        </div>
      </main>
    </div>
  );
}

// Timer component inline (simplicidade)
function Timer({ session, onFinish }) {
  const [secondsLeft, setSecondsLeft] = React.useState(session.minutes * 60);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    setSecondsLeft(session.minutes * 60);
    setRunning(false);
  }, [session]);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          clearInterval(id);
          onFinish();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="timer-card">
      <h2>{session.title}</h2>
      <div className="time">{mm}:{ss}</div>
      <div className="timer-controls">
        <button onClick={() => setRunning(r => !r)}>{running ? 'Pausar' : 'Iniciar'}</button>
        <button onClick={() => { setRunning(false); setSecondsLeft(session.minutes * 60); }}>Reset</button>
      </div>
    </div>
  );
}

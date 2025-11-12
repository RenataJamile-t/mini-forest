import React from 'react';

export default function SessionItem({ session, onDelete, onStart, onToggleDone, active }) {
  return (
    <li className={`session-item ${session.done ? 'done' : ''} ${active ? 'active' : ''}`}>
      <div className="left">
        <h3>{session.title}</h3>
        <small>{session.minutes} min</small>
      </div>
      <div className="actions">
        <button onClick={onStart}>▶</button>
        <button onClick={onToggleDone}>{session.done ? '↺' : '✓'}</button>
        <button onClick={onDelete}>🗑</button>
      </div>
    </li>
  );
}

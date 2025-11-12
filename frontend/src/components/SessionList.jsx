import React from 'react';
import SessionItem from './SessionItem';

export default function SessionList({ sessions, onDelete, onStart, onToggleDone, activeSession }) {
  return (
    <ul className="session-list">
      {sessions.map(s => (
        <SessionItem
          key={s.id}
          session={s}
          onDelete={() => onDelete(s.id)}
          onStart={() => onStart(s)}
          onToggleDone={() => onToggleDone(s.id, !s.done)}
          active={activeSession?.id === s.id}
        />
      ))}
    </ul>
  );
}

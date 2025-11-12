import React, { useState } from 'react';

export default function SessionForm({ addSession }) {
  const [title, setTitle] = useState('');
  const [minutes, setMinutes] = useState(25);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addSession({ title, minutes });
    setTitle('');
    setMinutes(25);
  };

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Nome da sessão (ex: Estudar SO)" />
      <div className="row">
        <input type="number" min="1" value={minutes} onChange={e => setMinutes(Number(e.target.value))} />
        <button type="submit">Criar</button>
      </div>
    </form>
  );
}

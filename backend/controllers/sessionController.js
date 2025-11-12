// backend/controllers/sessionController.js
const pool = require('../db');

async function getSessions(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM sessions ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar sessões' });
  }
}

async function getSession(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM sessions WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Sessão não encontrada' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar sessão' });
  }
}

async function createSession(req, res) {
  const { title, minutes } = req.body;
  if (!title || !minutes) return res.status(400).json({ error: 'Título e minutos são obrigatórios' });
  try {
    const [result] = await pool.query(
      'INSERT INTO sessions (title, minutes, done, created_at) VALUES (?, ?, 0, NOW())',
      [title, minutes]
    );
    const [rows] = await pool.query('SELECT * FROM sessions WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar sessão' });
  }
}

async function updateSession(req, res) {
  const { id } = req.params;
  const { title, minutes, done } = req.body;
  try {
    await pool.query(
      'UPDATE sessions SET title = COALESCE(?, title), minutes = COALESCE(?, minutes), done = COALESCE(?, done) WHERE id = ?',
      [title, minutes, done, id]
    );
    const [rows] = await pool.query('SELECT * FROM sessions WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar sessão' });
  }
}

async function deleteSession(req, res) {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM sessions WHERE id = ?', [id]);
    res.json({ message: 'Sessão removida' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar sessão' });
  }
}

module.exports = {
  getSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession
};

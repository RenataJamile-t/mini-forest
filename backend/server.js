// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/sessions', sessionRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));

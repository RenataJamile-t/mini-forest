// backend/routes/sessionRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/sessionController');

router.get('/', controller.getSessions);
router.get('/:id', controller.getSession);
router.post('/', controller.createSession);
router.put('/:id', controller.updateSession);
router.delete('/:id', controller.deleteSession);

module.exports = router;

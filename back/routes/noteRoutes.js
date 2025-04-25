const express = require('express');
const router = express.Router();
const controller = require('../controllers/noteController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authorizeRoles');

router.get('/', authenticateToken, authorizeRoles(['admin', 'prof']), controller.getAllNotes);
router.post('/', authenticateToken, authorizeRoles(['prof']), controller.createNote);
router.put('/:id', authenticateToken, authorizeRoles(['prof']), controller.updateNote);
router.delete('/:id', authenticateToken, authorizeRoles(['prof']), controller.deleteNote);

module.exports = router;
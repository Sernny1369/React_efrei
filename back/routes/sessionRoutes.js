const express = require('express');
const router = express.Router();
const controller = require('../controllers/sessionController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authorizeRoles');

router.get('/', authenticateToken, controller.getAllSessions);
router.get('/:id', authenticateToken, controller.getSessionById);
router.post('/', authenticateToken, authorizeRoles(['admin', 'prof']), controller.createSession);
router.put('/:id', authenticateToken, authorizeRoles(['admin']), controller.updateSession);
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), controller.deleteSession);

module.exports = router;
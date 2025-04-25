const express = require('express');
const router = express.Router();
const controller = require('../controllers/classController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authorizeRoles');

router.get('/', authenticateToken, controller.getAllClasses);
router.get('/:id', authenticateToken, controller.getClassById);
router.post('/', authenticateToken, authorizeRoles(['admin']), controller.createClass);
router.put('/:id', authenticateToken, authorizeRoles(['admin']), controller.updateClass);
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), controller.deleteClass);

module.exports = router;
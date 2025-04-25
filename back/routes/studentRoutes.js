const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authorizeRoles');

router.get('/', authenticateToken, authorizeRoles(['admin', 'prof']), controller.getAllStudents);
router.get('/:id', authenticateToken, authorizeRoles(['admin', 'prof', 'student']), controller.getStudentById);
router.post('/', authenticateToken, authorizeRoles(['admin']), controller.createStudent);
router.put('/:id', authenticateToken, authorizeRoles(['admin']), controller.updateStudent);
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), controller.deleteStudent);

module.exports = router;
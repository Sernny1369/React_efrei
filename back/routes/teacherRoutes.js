const express = require('express');
const router = express.Router();
const controller = require('../controllers/teacherController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authorizeRoles');

router.get('/', authenticateToken, controller.getAllTeachers);
router.get('/:id', authenticateToken, controller.getTeacherById);
router.post('/', authenticateToken, authorizeRoles(['admin']), controller.createTeacher);
router.put('/:id', authenticateToken, authorizeRoles(['admin']), controller.updateTeacher);
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), controller.deleteTeacher);

module.exports = router;
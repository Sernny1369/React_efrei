const express = require('express');
const router = express.Router();
const controller = require('../controllers/courseController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authorizeRoles');

router.get('/', authenticateToken, controller.getAllCourses);
router.get('/:id', authenticateToken, controller.getCourseById);
router.post('/', authenticateToken, authorizeRoles(['admin']), controller.createCourse);
router.put('/:id', authenticateToken, authorizeRoles(['admin']), controller.updateCourse);
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), controller.deleteCourse);

module.exports = router;
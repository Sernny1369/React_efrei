const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/classes', require('./routes/classRoutes'));
app.use('/api/teachers', require('./routes/teacherRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/sessions', require('./routes/sessionRoutes'));

// Gestion des erreurs
app.use(require('./middlewares/errorHandler'));

module.exports = app;
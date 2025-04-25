const Teacher = require('../models/Teacher');

exports.getAllTeachers = (req, res) => {
  res.json(Teacher.getAll());
};

exports.getTeacherById = (req, res) => {
  const teachers = Teacher.getAll();
  const teacher = teachers.find(t => t.id === parseInt(req.params.id));
  if (!teacher) return res.status(404).json({ error: 'Professeur non trouvé' });
  res.json(teacher);
};

exports.createTeacher = (req, res) => {
  const teachers = Teacher.getAll();
  const newTeacher = { id: Date.now(), ...req.body };
  teachers.push(newTeacher);
  Teacher.saveAll(teachers);
  res.status(201).json(newTeacher);
};

exports.updateTeacher = (req, res) => {
  const teachers = Teacher.getAll();
  const index = teachers.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Professeur non trouvé' });
  teachers[index] = { ...teachers[index], ...req.body };
  Teacher.saveAll(teachers);
  res.json(teachers[index]);
};

exports.deleteTeacher = (req, res) => {
  const teachers = Teacher.getAll();
  const filtered = teachers.filter(t => t.id !== parseInt(req.params.id));
  Teacher.saveAll(filtered);
  res.status(204).send();
};
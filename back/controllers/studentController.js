const Student = require('../models/Student');

exports.getAllStudents = (req, res) => {
  res.json(Student.getAll());
};

exports.getStudentById = (req, res) => {
  const students = Student.getAll();
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ error: 'Élève non trouvé' });
  res.json(student);
};

exports.createStudent = (req, res) => {
  const students = Student.getAll();
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  Student.saveAll(students);
  res.status(201).json(newStudent);
};

exports.updateStudent = (req, res) => {
  const students = Student.getAll();
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Élève non trouvé' });
  students[index] = { ...students[index], ...req.body };
  Student.saveAll(students);
  res.json(students[index]);
};

exports.deleteStudent = (req, res) => {
  const students = Student.getAll();
  const filtered = students.filter(s => s.id !== parseInt(req.params.id));
  Student.saveAll(filtered);
  res.status(204).send();
};
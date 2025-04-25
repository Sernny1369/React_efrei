const Course = require('../models/Course');

exports.getAllCourses = (req, res) => {
  res.json(Course.getAll());
};

exports.getCourseById = (req, res) => {
  const courses = Course.getAll();
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ error: 'Cours non trouvé' });
  res.json(course);
};

exports.createCourse = (req, res) => {
  const courses = Course.getAll();
  const newCourse = { id: Date.now(), ...req.body };
  courses.push(newCourse);
  Course.saveAll(courses);
  res.status(201).json(newCourse);
};

exports.updateCourse = (req, res) => {
  const courses = Course.getAll();
  const index = courses.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Cours non trouvé' });
  courses[index] = { ...courses[index], ...req.body };
  Course.saveAll(courses);
  res.json(courses[index]);
};

exports.deleteCourse = (req, res) => {
  const courses = Course.getAll();
  const filtered = courses.filter(c => c.id !== parseInt(req.params.id));
  Course.saveAll(filtered);
  res.status(204).send();
};
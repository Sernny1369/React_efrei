const Note = require('../models/Note');

exports.getAllNotes = (req, res) => {
  const notes = Note.getAll();
  const { studentId, courseId } = req.query;
  let filtered = notes;

  if (studentId) filtered = filtered.filter(n => n.studentId === parseInt(studentId));
  if (courseId) filtered = filtered.filter(n => n.courseId === parseInt(courseId));

  res.json(filtered);
};

exports.createNote = (req, res) => {
  const notes = Note.getAll();
  const newNote = { id: Date.now(), professorId: req.user.id, ...req.body };
  notes.push(newNote);
  Note.saveAll(notes);
  res.status(201).json(newNote);
};

exports.updateNote = (req, res) => {
  const notes = Note.getAll();
  const index = notes.findIndex(n => n.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Note non trouvée' });
  notes[index] = { ...notes[index], ...req.body };
  Note.saveAll(notes);
  res.json(notes[index]);
};

exports.deleteNote = (req, res) => {
  const notes = Note.getAll();
  const filtered = notes.filter(n => n.id !== parseInt(req.params.id));
  Note.saveAll(filtered);
  res.status(204).send();
};
const Class = require('../models/Class');

exports.getAllClasses = (req, res) => {
  res.json(Class.getAll());
};

exports.getClassById = (req, res) => {
  const classes = Class.getAll();
  const cls = classes.find(c => c.id === parseInt(req.params.id));
  if (!cls) return res.status(404).json({ error: 'Classe non trouvée' });
  res.json(cls);
};

exports.createClass = (req, res) => {
  const classes = Class.getAll();
  const newClass = { id: Date.now(), ...req.body };
  classes.push(newClass);
  Class.saveAll(classes);
  res.status(201).json(newClass);
};

exports.updateClass = (req, res) => {
  const classes = Class.getAll();
  const index = classes.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Classe non trouvée' });
  classes[index] = { ...classes[index], ...req.body };
  Class.saveAll(classes);
  res.json(classes[index]);
};

exports.deleteClass = (req, res) => {
  const classes = Class.getAll();
  const filtered = classes.filter(c => c.id !== parseInt(req.params.id));
  Class.saveAll(filtered);
  res.status(204).send();
};
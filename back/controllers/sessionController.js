const Session = require('../models/Session');

exports.getAllSessions = (req, res) => {
  res.json(Session.getAll());
};

exports.getSessionById = (req, res) => {
  const sessions = Session.getAll();
  const sess = sessions.find(s => s.id === parseInt(req.params.id));
  if (!sess) return res.status(404).json({ error: 'Session non trouvée' });
  res.json(sess);
};

exports.createSession = (req, res) => {
  const sessions = Session.getAll();
  const newSession = { id: Date.now(), ...req.body };
  sessions.push(newSession);
  Session.saveAll(sessions);
  res.status(201).json(newSession);
};

exports.updateSession = (req, res) => {
  const sessions = Session.getAll();
  const index = sessions.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Session non trouvée' });
  sessions[index] = { ...sessions[index], ...req.body };
  Session.saveAll(sessions);
  res.json(sessions[index]);
};

exports.deleteSession = (req, res) => {
  const sessions = Session.getAll();
  const filtered = sessions.filter(s => s.id !== parseInt(req.params.id));
  Session.saveAll(filtered);
  res.status(204).send();
};
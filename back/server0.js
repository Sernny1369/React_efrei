const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = "votre_cle_secrete";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Données en mémoire
const users = require("./data/users");
const filieres = [];
const classes = [];
const cours = [];
const sessions = [];
const eleves = [];
const notes = [];

// Middleware pour authentifier le token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Accès refusé" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Token invalide" });
    req.user = user;
    next();
  });
};

// Middleware pour vérifier les rôles
const authorizeRole = (roles) => (req, res, next) => {
  const user = users.find((u) => u.email === req.user.email);
  if (!user || !roles.includes(user.role)) {
    return res.status(403).json({ error: "Accès refusé. Permissions insuffisantes." });
  }
  next();
};

// CRUD Filières
app.get("/filieres", authenticateToken, authorizeRole(["admin"]), (req, res) => {
  res.json(filieres);
});

app.post("/filieres", authenticateToken, authorizeRole(["admin"]), (req, res) => {
  const { nom } = req.body;
  const newFiliere = { id: filieres.length + 1, nom, classes: [] };
  filieres.push(newFiliere);
  res.status(201).json(newFiliere);
});

app.put("/filieres/:id", authenticateToken, authorizeRole(["admin"]), (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  const filiere = filieres.find((f) => f.id === parseInt(id));
  if (!filiere) return res.status(404).json({ error: "Filière non trouvée" });
  filiere.nom = nom || filiere.nom;
  res.json(filiere);
});

app.delete("/filieres/:id", authenticateToken, authorizeRole(["admin"]), (req, res) => {
  const { id } = req.params;
  const index = filieres.findIndex((f) => f.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: "Filière non trouvée" });
  filieres.splice(index, 1);
  res.status(204).send();
});

// CRUD Classes
app.get("/classes", authenticateToken, authorizeRole(["admin"]), (req, res) => {
  res.json(classes);
});

app.post("/classes", authenticateToken, authorizeRole(["admin"]), (req, res) => {
  const { nom, filiereId } = req.body;
  const filiere = filieres.find((f) => f.id === parseInt(filiereId));
  if (!filiere) return res.status(404).json({ error: "Filière non trouvée" });

  const newClass = { id: classes.length + 1, nom, filiereId, eleves: [], cours: [] };
  classes.push(newClass);
  filiere.classes.push(newClass.id);
  res.status(201).json(newClass);
});

app.put("/classes/:id", authenticateToken, authorizeRole(["admin"]), (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  const classe = classes.find((c) => c.id === parseInt(id));
  if (!classe) return res.status(404).json({ error: "Classe non trouvée" });
  classe.nom = nom || classe.nom;
  res.json(classe);
});

app.delete("/classes/:id", authenticateToken, authorizeRole(["admin"]), (req, res) => {
  const { id } = req.params;
  const index = classes.findIndex((c) => c.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: "Classe non trouvée" });
  classes.splice(index, 1);
  res.status(204).send();
});

// CRUD Cours
app.get("/cours", authenticateToken, authorizeRole(["admin", "prof"]), (req, res) => {
  res.json(cours);
});

app.post("/cours", authenticateToken, authorizeRole(["admin"]), (req, res) => {
  const { nom, profId, classeId } = req.body;
  const classe = classes.find((c) => c.id === parseInt(classeId));
  if (!classe) return res.status(404).json({ error: "Classe non trouvée" });

  const newCours = { id: cours.length + 1, nom, profId, classeId, sessions: [], notes: [] };
  cours.push(newCours);
  classe.cours.push(newCours.id);
  res.status(201).json(newCours);
});

app.put("/cours/:id", authenticateToken, authorizeRole(["admin"]), (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  const coursItem = cours.find((c) => c.id === parseInt(id));
  if (!coursItem) return res.status(404).json({ error: "Cours non trouvé" });
  coursItem.nom = nom || coursItem.nom;
  res.json(coursItem);
});

app.delete("/cours/:id", authenticateToken, authorizeRole(["admin"]), (req, res) => {
  const { id } = req.params;
  const index = cours.findIndex((c) => c.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: "Cours non trouvé" });
  cours.splice(index, 1);
  res.status(204).send();
});

// CRUD Sessions
app.get("/sessions", authenticateToken, authorizeRole(["admin", "prof"]), (req, res) => {
  res.json(sessions);
});

app.post("/sessions", authenticateToken, authorizeRole(["admin"]), (req, res) => {
  const { date, heure, duree, salle, coursId } = req.body;
  const coursItem = cours.find((c) => c.id === parseInt(coursId));
  if (!coursItem) return res.status(404).json({ error: "Cours non trouvé" });

  const newSession = { id: sessions.length + 1, date, heure, duree, salle, coursId };
  sessions.push(newSession);
  coursItem.sessions.push(newSession.id);
  res.status(201).json(newSession);
});

app.put("/sessions/:id", authenticateToken, authorizeRole(["admin"]), (req, res) => {
  const { id } = req.params;
  const { date, heure, duree, salle } = req.body;
  const session = sessions.find((s) => s.id === parseInt(id));
  if (!session) return res.status(404).json({ error: "Session non trouvée" });
  session.date = date || session.date;
  session.heure = heure || session.heure;
  session.duree = duree || session.duree;
  session.salle = salle || session.salle;
  res.json(session);
});

app.delete("/sessions/:id", authenticateToken, authorizeRole(["admin"]), (req, res) => {
  const { id } = req.params;
  const index = sessions.findIndex((s) => s.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: "Session non trouvée" });
  sessions.splice(index, 1);
  res.status(204).send();
});

// CRUD Notes
app.get("/notes", authenticateToken, authorizeRole(["admin", "prof"]), (req, res) => {
  res.json(notes);
});

app.post("/notes", authenticateToken, authorizeRole(["prof"]), (req, res) => {
  const { eleveId, coursId, note } = req.body;
  const eleve = eleves.find((e) => e.id === parseInt(eleveId));
  if (!eleve) return res.status(404).json({ error: "Élève non trouvé" });

  const newNote = { id: notes.length + 1, eleveId, coursId, note };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.put("/notes/:id", authenticateToken, authorizeRole(["prof"]), (req, res) => {
  const { id } = req.params;
  const { note } = req.body;
  const noteItem = notes.find((n) => n.id === parseInt(id));
  if (!noteItem) return res.status(404).json({ error: "Note non trouvée" });
  noteItem.note = note || noteItem.note;
  res.json(noteItem);
});

app.delete("/notes/:id", authenticateToken, authorizeRole(["prof"]), (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex((n) => n.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: "Note non trouvée" });
  notes.splice(index, 1);
  res.status(204).send();
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Une erreur interne est survenue." });
});

// Route par défaut
app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
});
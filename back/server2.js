const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Fonction utilitaire pour valider la pagination
const validatePagination = (page, limit) => {
  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
    throw new Error("Les paramètres page et limit doivent être des nombres positifs.");
  }
};


// Route test
app.get("/hello", (req, res) => {
  res.json({ message: "Hello depuis le backend !" });
});

// Route test
app.get("/planning", (req, res) => {
  res.json({ message: "voici ton planing" });
});

app.post("/planning", (req, res) => {
  const { planning } = req.body;
  if (!planning) {
    return res.status(400).json({ error: "Planning data is required" });
  }
  res.status(201).json({ message: "Planning received", planning });
});



// CRUD Élèves
const eleves = [];

app.get("/eleves", (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    validatePagination(page, limit);

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    let filteredEleves = eleves;

    // Filtrage par nom ou prénom
    if (search) {
      filteredEleves = eleves.filter(
        (e) =>
          e.nom.toLowerCase().includes(search.toLowerCase()) ||
          e.prenom.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Pagination
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;
    const paginatedEleves = filteredEleves.slice(startIndex, endIndex);

    if (paginatedEleves.length === 0) {
      return res.status(404).json({ error: "Aucun élève trouvé" });
    }

    res.json({
      total: filteredEleves.length,
      page: pageNumber,
      limit: limitNumber,
      data: paginatedEleves,
    });
  } catch (err) {
    next(err);
  }
});

app.post("/eleves", (req, res) => {
  const { nom, prenom } = req.body;
  if (!nom || !prenom) {
    return res.status(400).json({ error: "Nom et prénom sont requis" });
  }
  const existingEleve = eleves.find((e) => e.nom === nom && e.prenom === prenom);
  if (existingEleve) {
    return res.status(400).json({ error: "Un élève avec ce nom et prénom existe déjà." });
  }
  const newEleve = { id: eleves.length + 1, nom, prenom };
  eleves.push(newEleve);
  res.status(201).json(newEleve);
});

app.put("/eleves/:id", (req, res) => {
  const { id } = req.params;
  const { nom, prenom } = req.body;
  const eleve = eleves.find((e) => e.id === parseInt(id));
  if (!eleve) {
    return res.status(404).json({ error: "Élève non trouvé" });
  }
  if (nom && nom.trim() === "") {
    return res.status(400).json({ error: "Le nom de l'élève ne peut pas être vide." });
  }
  eleve.nom = nom || eleve.nom;
  eleve.prenom = prenom || eleve.prenom;
  res.json(eleve);
});

app.delete("/eleves/:id", (req, res) => {
  const { id } = req.params;
  const index = eleves.findIndex((e) => e.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Élève non trouvé" });
  }
  eleves.splice(index, 1);
  res.status(204).send();
});



// CRUD Filières
const filieres = []; // Tableau pour stocker les filières

app.get("/filieres", (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    validatePagination(page, limit);

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    let filteredFilieres = filieres;

    if (search) {
      filteredFilieres = filieres.filter((f) =>
        f.nom.toLowerCase().includes(search.toLowerCase())
      );
    }

    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;
    const paginatedFilieres = filteredFilieres.slice(startIndex, endIndex);

    if (paginatedFilieres.length === 0) {
      return res.status(404).json({ error: "Aucune filière trouvée" });
    }

    res.json({
      total: filteredFilieres.length,
      page: pageNumber,
      limit: limitNumber,
      data: paginatedFilieres,
    });
  } catch (err) {
    next(err);
  }
});

app.post("/filieres", (req, res) => {
  const { nom } = req.body;
  if (!nom) {
    return res.status(400).json({ error: "Le nom de la filière est requis" });
  }
  const existingFiliere = filieres.find((f) => f.nom === nom);
  if (existingFiliere) {
    return res.status(400).json({ error: "Une filière avec ce nom existe déjà." });
  }
  const newFiliere = { id: filieres.length + 1, nom };
  filieres.push(newFiliere);
  res.status(201).json(newFiliere);
});

app.put("/filieres/:id", (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  const filiere = filieres.find((f) => f.id === parseInt(id));
  if (!filiere) {
    return res.status(404).json({ error: "Filière non trouvée" });
  }
  if (nom && nom.trim() === "") {
    return res.status(400).json({ error: "Le nom de la filière ne peut pas être vide." });
  }
  const existingFiliere = filieres.find((f) => f.nom === nom && f.id !== parseInt(id));
  if (existingFiliere) {
    return res.status(400).json({ error: "Une autre filière avec ce nom existe déjà." });
  }
  filiere.nom = nom || filiere.nom;
  res.json(filiere);
});

app.delete("/filieres/:id", (req, res) => {
  const { id } = req.params;
  const index = filieres.findIndex((f) => f.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Filière non trouvée" });
  }
  filieres.splice(index, 1);
  res.status(204).send();
});



// CRUD Classes
const classes = []; // Tableau pour stocker les classes

app.get("/classes", (req, res, next) => {
  try {
    const { page = 1, limit = 10, nom } = req.query;
    validatePagination(page, limit);

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    let filteredClasses = classes;

    if (nom) {
      filteredClasses = classes.filter((c) =>
        c.nom.toLowerCase().includes(nom.toLowerCase())
      );
    }
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;
    const paginatedClasses = filteredClasses.slice(startIndex, endIndex);
    if (paginatedClasses.length === 0) {
      return res.status(404).json({ error: "Aucune classe trouvée" });
    }

    res.json({
      total: filteredClasses.length,
      page: pageNumber,
      limit: limitNumber,
      data: paginatedClasses,
    });
  } catch (err) {
    next(err);
  }
});

app.post("/classes", (req, res) => {
  const { nom } = req.body;
  if (!nom || nom.trim() === "") {
    return res.status(400).json({ error: "Le nom de la classe est requis et ne peut pas être vide." });
  }
  const existingClass = classes.find((c) => c.nom === nom);
  if (existingClass) {
    return res.status(400).json({ error: "Une classe avec ce nom existe déjà." });
  }
  const newClass = { id: classes.length + 1, nom };
  classes.push(newClass);
  res.status(201).json(newClass);
});

app.put("/classes/:id", (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  const classItem = classes.find((c) => c.id === parseInt(id));
  if (!classItem) {
    return res.status(404).json({ error: "Classe non trouvée" });
  }
  if (nom && nom.trim() === "") {
    return res.status(400).json({ error: "Le nom de la classe ne peut pas être vide." });
  }
  const existingClass = classes.find((c) => c.nom === nom && c.id !== parseInt(id));
  if (existingClass) {
    return res.status(400).json({ error: "Une autre classe avec ce nom existe déjà." });
  }
  classItem.nom = nom || classItem.nom;
  res.json(classItem);
});

app.delete("/classes/:id", (req, res) => {
  const { id } = req.params;
  const index = classes.findIndex((c) => c.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Classe non trouvée" });
  }
  classes.splice(index, 1);
  res.status(204).send();
});



// CRUD Professeurs
const profs = []; // Tableau pour stocker les professeurs

app.get("/profs", (req, res, next) => {
  try {
    const { page = 1, limit = 10, nom } = req.query;
    validatePagination(page, limit);

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    let filteredProfs = profs;

    if (nom) {
      filteredProfs = profs.filter((p) =>
        p.nom.toLowerCase().includes(nom.toLowerCase())
      );
    }
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;
    const paginatedProfs = filteredProfs.slice(startIndex, endIndex);
    if (paginatedProfs.length === 0) {
      return res.status(404).json({ error: "Aucun professeur trouvé" });
    }

    res.json({
      total: filteredProfs.length,
      page: pageNumber,
      limit: limitNumber,
      data: paginatedProfs,
    });
  } catch (err) {
    next(err);
  }
});

app.post("/profs", (req, res) => {
  const { nom } = req.body;
  if (!nom || nom.trim() === "") {
    return res.status(400).json({ error: "Le nom du professeur est requis et ne peut pas être vide." });
  }
  const formattedNom = `P.${nom.trim()}`;
  const existingProf = profs.find((p) => p.nom === formattedNom);
  if (existingProf) {
    return res.status(400).json({ error: "Un professeur avec ce nom existe déjà." });
  }
  const newProf = { id: profs.length + 1, nom: formattedNom };
  profs.push(newProf);
  res.status(201).json(newProf);
});

app.put("/profs/:id", (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  const prof = profs.find((p) => p.id === parseInt(id));
  if (!prof) {
    return res.status(404).json({ error: "Professeur non trouvé" });
  }
  if (nom && nom.trim() === "") {
    return res.status(400).json({ error: "Le nom du professeur ne peut pas être vide." });
  }
  const formattedNom = nom ? `P.${nom.trim()}` : prof.nom;
  const existingProf = profs.find((p) => p.nom === formattedNom && p.id !== parseInt(id));
  if (existingProf) {
    return res.status(400).json({ error: "Un autre professeur avec ce nom existe déjà." });
  }
  prof.nom = formattedNom;
  res.json(prof);
});

app.delete("/profs/:id", (req, res) => {
  const { id } = req.params;
  const index = profs.findIndex((p) => p.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Professeur non trouvé" });
  }
  profs.splice(index, 1);
  res.status(204).send();
});



// CRUD Sessions
const sessions = []; // Tableau pour stocker les sessions

app.get("/sessions", (req, res, next) => {
  try {
    const { page = 1, limit = 10, nom } = req.query;
    validatePagination(page, limit);

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    let filteredSessions = sessions;

    if (nom) {
      filteredSessions = sessions.filter((s) =>
        s.nom.toLowerCase().includes(nom.toLowerCase())
      );
    }
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;
    const paginatedSessions = filteredSessions.slice(startIndex, endIndex);
    if (paginatedSessions.length === 0) {
      return res.status(404).json({ error: "Aucune session trouvée" });
    }

    res.json({
      total: filteredSessions.length,
      page: pageNumber,
      limit: limitNumber,
      data: paginatedSessions,
    });
  } catch (err) {
    next(err);
  }
});

app.post("/sessions", (req, res) => {
  const { nom } = req.body;
  if (!nom || nom.trim() === "") {
    return res.status(400).json({ error: "Le nom de la session est requis et ne peut pas être vide." });
  }
  const existingSession = sessions.find((s) => s.nom === nom);
  if (existingSession) {
    return res.status(400).json({ error: "Une session avec ce nom existe déjà." });
  }
  const newSession = { id: sessions.length + 1, nom };
  sessions.push(newSession);
  res.status(201).json(newSession);
});

app.put("/sessions/:id", (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  const session = sessions.find((s) => s.id === parseInt(id));
  if (!session) {
    return res.status(404).json({ error: "Session non trouvée" });
  }
  if (nom && nom.trim() === "") {
    return res.status(400).json({ error: "Le nom de la session ne peut pas être vide." });
  }
  const existingSession = sessions.find((s) => s.nom === nom && s.id !== parseInt(id));
  if (existingSession) {
    return res.status(400).json({ error: "Une autre session avec ce nom existe déjà." });
  }
  session.nom = nom || session.nom;
  res.json(session);
});

app.delete("/sessions/:id", (req, res) => {
  const { id } = req.params;
  const index = sessions.findIndex((s) => s.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Session non trouvée" });
  }
  sessions.splice(index, 1);
  res.status(204).send();
});



// CRUD Cours
const cours = []; // Tableau pour stocker les cours

app.get("/cours", (req, res, next) => {
  try {
    const { page = 1, limit = 10, nom } = req.query;
    validatePagination(page, limit);

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    let filteredCours = cours;

    if (nom) {
      filteredCours = cours.filter((c) =>
        c.nom.toLowerCase().includes(nom.toLowerCase())
      );
    }
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;
    const paginatedCours = filteredCours.slice(startIndex, endIndex);
    if (paginatedCours.length === 0) {
      return res.status(404).json({ error: "Aucun cours trouvé" });
    }

    res.json({
      total: filteredCours.length,
      page: pageNumber,
      limit: limitNumber,
      data: paginatedCours,
    });
  } catch (err) {
    next(err);
  }
});

app.post("/cours", (req, res) => {
  const { nom } = req.body;
  if (!nom || nom.trim() === "") {
    return res.status(400).json({ error: "Le nom du cours est requis et ne peut pas être vide." });
  }
  const existingCours = cours.find((c) => c.nom === nom);
  if (existingCours) {
    return res.status(400).json({ error: "Un cours avec ce nom existe déjà." });
  }
  const newCours = { id: cours.length + 1, nom };
  cours.push(newCours);
  res.status(201).json(newCours);
});

app.put("/cours/:id", (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  const coursItem = cours.find((c) => c.id === parseInt(id));
  if (!coursItem) {
    return res.status(404).json({ error: "Cours non trouvé" });
  }
  if (nom && nom.trim() === "") {
    return res.status(400).json({ error: "Le nom du cours ne peut pas être vide." });
  }
  const existingCours = cours.find((c) => c.nom === nom && c.id !== parseInt(id));
  if (existingCours) {
    return res.status(400).json({ error: "Un autre cours avec ce nom existe déjà." });
  }
  coursItem.nom = nom || coursItem.nom;
  res.json(coursItem);
});

app.delete("/cours/:id", (req, res) => {
  const { id } = req.params;
  const index = cours.findIndex((c) => c.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Cours non trouvé" });
  }
  cours.splice(index, 1);
  res.status(204).send();
});



// CRUD Notes
const notes = []; // Tableau pour stocker les notes

app.get("/notes", (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, eleveId } = req.query;
    validatePagination(page, limit);

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    let filteredNotes = notes;

    if (search) {
      filteredNotes = filteredNotes.filter((n) =>
        n.nom.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (eleveId) {
      filteredNotes = filteredNotes.filter((n) => n.eleveId === parseInt(eleveId));
    }
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;
    const paginatedNotes = filteredNotes.slice(startIndex, endIndex);
    if (paginatedNotes.length === 0) {
      return res.status(404).json({ error: "Aucune note trouvée" });
    }

    res.json({
      total: filteredNotes.length,
      page: pageNumber,
      limit: limitNumber,
      data: paginatedNotes,
    });
  } catch (err) {
    next(err);
  }
});

app.post("/notes", (req, res) => {
  const { nom, note, eleveId } = req.body;

  // Validation des données
  if (!nom || !note || !eleveId) {
    return res.status(400).json({ error: "Nom, note et eleveId sont requis" });
  }

  // Vérifiez que l'élève existe
  const eleve = eleves.find((e) => e.id === parseInt(eleveId));
  if (!eleve) {
    return res.status(404).json({ error: "Élève non trouvé" });
  }

  // Vérifiez les doublons
  const existingNote = notes.find((n) => n.nom === nom && n.eleveId === parseInt(eleveId));
  if (existingNote) {
    return res.status(400).json({ error: "Une note avec ce nom existe déjà pour cet élève." });
  }

  // Validation de la note (par exemple, entre 0 et 20)
  if (isNaN(note) || note < 0 || note > 20) {
    return res.status(400).json({ error: "La note doit être un nombre entre 0 et 20." });
  }

  // Créez la nouvelle note
  const newNote = { id: notes.length + 1, nom, note: parseFloat(note), eleveId: parseInt(eleveId) };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { nom, note, eleveId } = req.body;

  // Trouver la note à mettre à jour
  const noteItem = notes.find((n) => n.id === parseInt(id));
  if (!noteItem) {
    return res.status(404).json({ error: "Note non trouvée" });
  }

  // Validation du nom
  if (nom && nom.trim() === "") {
    return res.status(400).json({ error: "Le nom de la note ne peut pas être vide." });
  }

  // Validation de la note (par exemple, entre 0 et 20)
  if (note && (isNaN(note) || note < 0 || note > 20)) {
    return res.status(400).json({ error: "La note doit être un nombre entre 0 et 20." });
  }

  // Validation de l'eleveId
  if (eleveId) {
    const eleve = eleves.find((e) => e.id === parseInt(eleveId));
    if (!eleve) {
      return res.status(404).json({ error: "Élève non trouvé" });
    }
    noteItem.eleveId = parseInt(eleveId);
  }

  // Mise à jour des champs
  noteItem.nom = nom || noteItem.nom;
  noteItem.note = note !== undefined ? parseFloat(note) : noteItem.note;

  res.json(noteItem);
});

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex((n) => n.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Note non trouvée" });
  }
  notes.splice(index, 1);
  res.status(204).send();
});




// Démarrer le serveur
app.get("/", (req, res) => {
  res.send("API en cours d'exécution !");
});

app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});


// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Une erreur interne est survenue." });
});


// Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
});


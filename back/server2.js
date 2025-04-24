const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.get("/eleves", (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
    return res.status(400).json({ error: "Page et limite doivent être des nombres positifs." });
  }

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
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedEleves = filteredEleves.slice(startIndex, endIndex);

  if (paginatedEleves.length === 0) {
    return res.status(404).json({ error: "Aucun élève trouvé" });
  }

  res.json({
    total: filteredEleves.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginatedEleves,
  });
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

app.get("/filieres", (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
    return res.status(400).json({ error: "Page et limite doivent être des nombres positifs." });
  }
  let filteredFilieres = filieres;
  if (search) {
    filteredFilieres = filieres.filter((f) =>
      f.nom.toLowerCase().includes(search.toLowerCase())
    );
  }
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedFilieres = filteredFilieres.slice(startIndex, endIndex);
  if (paginatedFilieres.length === 0) {
    return res.status(404).json({ error: "Aucune filière trouvée" });
  }

  res.json({
    total: filteredFilieres.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginatedFilieres,
  });
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

app.get("/classes", (req, res) => {
  const { page = 1, limit = 10, nom } = req.query;
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
    return res.status(400).json({ error: "Page et limite doivent être des nombres positifs." });
  }
  let filteredClasses = classes;
  if (nom) {
    filteredClasses = classes.filter((c) => c.nom.toLowerCase().includes(nom.toLowerCase()));
  }
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedClasses = filteredClasses.slice(startIndex, endIndex);
  if (paginatedClasses.length === 0) {
    return res.status(404).json({ error: "Aucune classe trouvée" });
  }

  res.json({
    total: filteredClasses.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginatedClasses,
  });
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






// Démarrer le serveur
app.get("/", (req, res) => {
  res.send("API en cours d'exécution !");
});

app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});



// Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
});


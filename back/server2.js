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


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


const express = require("express");
const cors = require("cors");
const users= require("./data/users");
const cours= require("./data/cours");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "votre_cle_secrete"; 
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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



// Route test
app.get("/hello", (req, res) => {
  res.json({ message: "Hello depuis le backend !" });
});

// Route post user
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Vérifie si l'utilisateur existe
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ message: "Connexion réussie", user,token });
  } else {
      res.status(401).json({ error: "Email ou mot de passe incorrect" });
  }
});



// Route planning 

app.get("/planning", authenticateToken, (req, res) => {
  // Récupérer l'email du professeur connecté depuis le token
  const email = req.user.email;

  // Filtrer les cours pour ne renvoyer que ceux du professeur connecté
  const coursDuProf = cours.filter(c => c.profEmail === email);

  if (coursDuProf.length > 0) {
      res.status(200).json(coursDuProf);
  } else {
      res.status(404).json({ error: "Aucun cours trouvé pour ce professeur." });
  }
});

app.post("/add-cours", authenticateToken, (req, res) => {
    const { matiere, date, heure, duree, salle, description } = req.body;

    // Vérifiez si l'utilisateur connecté est un professeur
    const user = users.find(u => u.email === req.user.email);
    if (!user || user.role !== "prof") {
        return res.status(403).json({ error: "Accès refusé. Seuls les professeurs peuvent ajouter des cours." });
    }

    // Créer un nouveau cours
    const nouveauCours = {
        matiere,
        prof: `${user.prenom} ${user.nom}`,
        profEmail: user.email,
        eleves: [], // Initialement vide
        date,
        heure,
        duree,
        salle,
        description
    };

    // Ajouter le cours à la liste
    cours.push(nouveauCours);

    res.status(201).json({ message: "Cours ajouté avec succès.", cours: nouveauCours });
});

//Route info compte
app.get("/account", authenticateToken, (req, res) => {
  const email = req.user.email;
  const user = users.find(u => u.email === email);

  if (user) {
      // Retourner les informations de l'utilisateur
      res.json({
          nom: user.nom,
          prenom: user.prenom,
          email: user.email
      });
  } else {
      res.status(404).json({ error: "Utilisateur non trouvé" });
  }
  res.json(user);
});

//route ajout note
app.post("/add-note", authenticateToken, (req, res) => {
  const { eleveId, note, matiere } = req.body;

  // Vérifiez si l'utilisateur connecté est un professeur
  const user = users.find(u => u.email === req.user.email);
  if (!user || user.role !== "prof") {
      return res.status(403).json({ error: "Accès refusé. Seuls les professeurs peuvent ajouter des notes." });
  }

  // Trouvez l'élève correspondant
  const eleve = users.find(u => u.id === eleveId && u.role === "student");
  if (!eleve) {
      return res.status(404).json({ error: "Élève non trouvé." });
  }

  // Ajoutez la note à l'élève
  eleve.notes.push({ id: eleve.notes.length + 1, note, matiere });

  res.status(200).json({ message: "Note ajoutée avec succès.", eleve });
});



app.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
});

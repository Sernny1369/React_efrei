const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/admin");
const profRoutes = require("./routes/prof");
const studentRoutes = require("./routes/student");
const generalRoutes = require("./routes/general");
const profs = require("./data/profs");
const students = require("./data/students");
const admins = require("./data/admins");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "votre_cle_secrete"; 
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/admin", adminRoutes);
app.use("/prof", profRoutes);
app.use("/student", studentRoutes);
app.use("/", generalRoutes);

// Middleware pour authentifier les tokens
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

// Middleware pour autoriser les rôles
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: "Accès refusé. Vous n'avez pas les permissions nécessaires." });
    }
    next();
  };
};

// Route test
app.get("/hello", (req, res) => {
  res.json({ message: "Hello depuis le backend !" });
});


// Route post user
app.post("/login-prof", (req, res) => {
  const { email, password } = req.body;

  const user = profs.find(u => u.email === email && u.password === password);

  if (user) {
      const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
      res.status(200).json({ token, user });
  } else {
      res.status(401).json({ error: "Email ou mot de passe incorrect pour un professeur." });
  }
});

app.post("/login-student", (req, res) => {
  const { email, password } = req.body;

  const user = students.find(u => u.email === email && u.password === password);

  if (user) {
      const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
      res.status(200).json({ token, user });
  } else {
      res.status(401).json({ error: "Email ou mot de passe incorrect pour un étudiant." });
  }
});

app.post("/login-admin", (req, res) => {
  const { email, password } = req.body;

  const user = admins.find(u => u.email === email && u.password === password);

  if (user) {
      const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
      res.status(200).json({ token, user });
  } else {
      res.status(401).json({ error: "Email ou mot de passe incorrect pour un administrateur." });
  }
});




app.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
});

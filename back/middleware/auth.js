const jwt = require("jsonwebtoken");
const SECRET_KEY = "votre_cle_secrete"; // Remplacez par votre clé secrète

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

const authorizeRole = (role) => {
  return (req, res, next) => {
      if (req.user.role !== role) {
          return res.status(403).json({ error: "Accès refusé. Vous n'avez pas les permissions nécessaires." });
      }
      next();
  };
};

module.exports = { authenticateToken, authorizeRole };
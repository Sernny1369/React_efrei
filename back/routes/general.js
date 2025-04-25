const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const students = require("../data/students");
const profs = require("../data/profs");
const admins = require("../data/admins");

// Route pour récupérer les informations du compte
router.get("/account", authenticateToken, (req, res) => {
    const email = req.user.email;
    let user;

    if (req.user.role === "admin") {
        user = admins.find(u => u.email === email);
    } else if (req.user.role === "prof") {
        user = profs.find(u => u.email === email);
    } else if (req.user.role === "student") {
        user = students.find(u => u.email === email);
    }

    if (user) {
        res.json({
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
        });
    } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
    }
});


module.exports = router;
const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRole } = require("../middleware/auth");
const cours = require("../data/cours");
const students = require("../data/students");

// Routes pour les cours d'un étudiant
router.get("/cours", authenticateToken, authorizeRole("student"), (req, res) => {
    const studentEmail = req.user.email;
    const coursDeLEtudiant = cours.filter(c => c.students.some(s => s.email === studentEmail));
    res.status(200).json(coursDeLEtudiant);
});

// Routes pour les notes d'un étudiant
router.get("/notes", authenticateToken, authorizeRole("student"), (req, res) => {
    const studentEmail = req.user.email;
    const student = students.find(s => s.email === studentEmail);
    if (!student) {
        return res.status(404).json({ error: "Étudiant non trouvé." });
    }
    res.status(200).json(student.notes);
});

module.exports = router;
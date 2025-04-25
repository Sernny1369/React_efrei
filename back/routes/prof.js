const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRole } = require("../middleware/auth");
const cours = require("../data/cours");
const students = require("../data/students");

// Routes pour les cours d'un professeur
router.get("/cours", authenticateToken, authorizeRole("prof"), (req, res) => {
    const profEmail = req.user.email;
    const coursDuProf = cours.filter(c => c.profEmail === profEmail);
    res.status(200).json(coursDuProf);
});

// Routes pour ajouter des notes
router.post("/notes", authenticateToken, authorizeRole("prof"), (req, res) => {
    const { eleveId, note, matiere } = req.body;
    const student = students.find(s => s.id === eleveId);
    if (!student) {
        return res.status(404).json({ error: "Élève non trouvé." });
    }
    const newNote = { id: student.notes.length + 1, note, matiere };
    student.notes.push(newNote);
    res.status(201).json({ message: "Note ajoutée avec succès.", note: newNote });
});

router.get("/cours/:id/eleves", authenticateToken, authorizeRole("prof"), (req, res) => {
  const { id } = req.params;
  const cour = cours.find(c => c.id === parseInt(id));
  if (!cour) {
      return res.status(404).json({ error: "Cours non trouvé." });
  }
  const studentsInCours = students.filter(student => cour.students.includes(student.id));
  res.status(200).json(studentsInCours);
});

module.exports = router;
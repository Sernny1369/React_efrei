const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRole } = require("../middleware/auth");
const students = require("../data/students");
const filieres = require("../data/filieres");
const classes = require("../data/classes");
const profs = require("../data/profs");
const sessions = require("../data/sessions");
const cours = require("../data/cours");

// Routes pour les élèves
router.get("/eleves", authenticateToken, authorizeRole("admin"), (req, res) => {
    res.status(200).json(students);
});

router.post("/eleves", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { prenom, nom, email, password, classe } = req.body;
    const newStudent = {
        id: students.length + 1,
        prenom,
        nom,
        email,
        password,
        role: "student",
        classe,
        notes: []
    };
    students.push(newStudent);
    res.status(201).json({ message: "Élève ajouté avec succès.", student: newStudent });
});

router.put("/eleves/:id", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { id } = req.params;
    const student = students.find(s => s.id === parseInt(id));
    if (!student) {
        return res.status(404).json({ error: "Élève non trouvé." });
    }
    Object.assign(student, req.body);
    res.status(200).json({ message: "Élève mis à jour avec succès.", student });
});

router.delete("/eleves/:id", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { id } = req.params;
    const index = students.findIndex(s => s.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: "Élève non trouvé." });
    }
    students.splice(index, 1);
    res.status(200).json({ message: "Élève supprimé avec succès." });
});

// Routes pour les filières
router.get("/filieres", authenticateToken, authorizeRole("admin"), (req, res) => {
    res.status(200).json(filieres);
});

router.post("/filieres", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { nom } = req.body;
    const newFiliere = { id: filieres.length + 1, nom };
    filieres.push(newFiliere);
    res.status(201).json({ message: "Filière ajoutée avec succès.", filiere: newFiliere });
});

router.put("/filieres/:id", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { id } = req.params;
    const filiere = filieres.find(f => f.id === parseInt(id));
    if (!filiere) {
        return res.status(404).json({ error: "Filière non trouvée." });
    }
    Object.assign(filiere, req.body);
    res.status(200).json({ message: "Filière mise à jour avec succès.", filiere });
});

router.delete("/filieres/:id", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { id } = req.params;
    const index = filieres.findIndex(f => f.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: "Filière non trouvée." });
    }
    filieres.splice(index, 1);
    res.status(200).json({ message: "Filière supprimée avec succès." });
});

// Routes pour les classes
router.get("/classes", authenticateToken, authorizeRole("admin"), (req, res) => {
    res.status(200).json(classes);
});

router.post("/classes", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { nom, filiereId } = req.body;
    const newClasse = { id: classes.length + 1, nom, filiereId };
    classes.push(newClasse);
    res.status(201).json({ message: "Classe ajoutée avec succès.", classe: newClasse });
});

router.put("/classes/:id", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { id } = req.params;
    const classe = classes.find(c => c.id === parseInt(id));
    if (!classe) {
        return res.status(404).json({ error: "Classe non trouvée." });
    }
    Object.assign(classe, req.body);
    res.status(200).json({ message: "Classe mise à jour avec succès.", classe });
});

router.delete("/classes/:id", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { id } = req.params;
    const index = classes.findIndex(c => c.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: "Classe non trouvée." });
    }
    classes.splice(index, 1);
    res.status(200).json({ message: "Classe supprimée avec succès." });
});

// Routes pour les professeurs
router.get("/profs", authenticateToken, authorizeRole("admin"), (req, res) => {
    res.status(200).json(profs);
});

router.post("/profs", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { prenom, nom, email, password } = req.body;
    const newProf = { id: profs.length + 1, prenom, nom, email, password, role: "prof" };
    profs.push(newProf);
    res.status(201).json({ message: "Professeur ajouté avec succès.", prof: newProf });
});

router.put("/profs/:id", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { id } = req.params;
    const prof = profs.find(p => p.id === parseInt(id));
    if (!prof) {
        return res.status(404).json({ error: "Professeur non trouvé." });
    }
    Object.assign(prof, req.body);
    res.status(200).json({ message: "Professeur mis à jour avec succès.", prof });
});

router.delete("/profs/:id", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { id } = req.params;
    const index = profs.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: "Professeur non trouvé." });
    }
    profs.splice(index, 1);
    res.status(200).json({ message: "Professeur supprimé avec succès." });
});

// Routes pour les sessions
router.get("/sessions", authenticateToken, authorizeRole("admin"), (req, res) => {
    res.status(200).json(sessions);
});

router.post("/sessions", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { nom, dateDebut, dateFin } = req.body;
    const newSession = { id: sessions.length + 1, nom, dateDebut, dateFin };
    sessions.push(newSession);
    res.status(201).json({ message: "Session ajoutée avec succès.", session: newSession });
});

router.put("/sessions/:id", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { id } = req.params;
    const session = sessions.find(s => s.id === parseInt(id));
    if (!session) {
        return res.status(404).json({ error: "Session non trouvée." });
    }
    Object.assign(session, req.body);
    res.status(200).json({ message: "Session mise à jour avec succès.", session });
});

router.delete("/sessions/:id", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { id } = req.params;
    const index = sessions.findIndex(s => s.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: "Session non trouvée." });
    }
    sessions.splice(index, 1);
    res.status(200).json({ message: "Session supprimée avec succès." });
});

// Routes pour les cours
router.get("/cours", authenticateToken, authorizeRole("admin"), (req, res) => {
    res.status(200).json(cours);
});

router.post("/cours", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { matiere, profId, date, heure, duree, salle, description } = req.body;
    const newCours = { id: cours.length + 1, matiere, profId, date, heure, duree, salle, description, students: [] };
    cours.push(newCours);
    res.status(201).json({ message: "Cours ajouté avec succès.", cours: newCours });
});

router.put("/cours/:id", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { id } = req.params;
    const cour = cours.find(c => c.id === parseInt(id));
    if (!cour) {
        return res.status(404).json({ error: "Cours non trouvé." });
    }
    Object.assign(cour, req.body);
    res.status(200).json({ message: "Cours mis à jour avec succès.", cours: cour });
});

router.delete("/cours/:id", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { id } = req.params;
    const index = cours.findIndex(c => c.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: "Cours non trouvé." });
    }
    cours.splice(index, 1);
    res.status(200).json({ message: "Cours supprimé avec succès." });
});

router.post("/cours/:id/inscrire", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { id } = req.params;
    const { studentId } = req.body;

    const cour = cours.find(c => c.id === parseInt(id));
    if (!cour) {
        return res.status(404).json({ error: "Cours non trouvé." });
    }

    const student = students.find(s => s.id === studentId);
    if (!student) {
        return res.status(404).json({ error: "Élève non trouvé." });
    }

    if (!cour.students.includes(studentId)) {
        cour.students.push(studentId);
    }

    res.status(200).json({ message: "Élève inscrit avec succès.", cours: cour });
});

router.get("/classes/:id/eleves", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { id } = req.params;
    const studentsInClass = students.filter(student => student.classe === id);
    res.status(200).json(studentsInClass);
});
// Route pour récupérer les classes d'une filière
router.get("/filieres/:id/classes", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { id } = req.params;
    const classesInFiliere = classes.filter(classe => classe.filiereId === parseInt(id));
    res.status(200).json(classesInFiliere);
});

module.exports = router;
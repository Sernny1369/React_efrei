const students = [
    {
        id: 1,
        role: "student",
        prenom: "Jane",
        nom: "Smith",
        email: "janesmith@test.com",
        password: "password456",
        notes: [
            { id: 1, note: 14, matiere: "Maths" },
            { id: 2, note: 10, matiere: "Anglais" },
            { id: 3, note: 16, matiere: "Physique" }
        ]
    },
    {
        id: 2,
        prenom: "Charlie",
        role: "student",
        nom: "Brown",
        email: "charliebrown@test.com",
        password: "password789",
        classe: "Classe A",
        notes: [
            { id: 1, note: 15, matiere: "Maths" },
            { id: 2, note: 12, matiere: "Anglais" },
            { id: 3, note: 18, matiere: "Physique" }
        ]
    },
    {
        id: 3,
        role: "student",
        prenom: "Bob",
        nom: "Lee",
        email: "boblee@test.com",
        password: "password202",
        notes: [
            { id: 1, note: 13, matiere: "Maths" },
            { id: 2, note: 11, matiere: "Anglais" },
            { id: 3, note: 17, matiere: "Physique" }
        ]
    }
]
module.exports = students;
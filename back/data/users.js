const users = [
    {
        id: 0,
        role: "admin",
        prenom: "Admin",
        nom: "Admin",
        email: "admin@test.com",
        password: "admin123",
    },
    {
        id: 1,
        role: "prof",
        prenom: "John",
        nom: "Doe",
        email: "johndoe@test.com",
        password: "password123",
        eleves: []
    },
    {
        id: 2,
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
        id: 3,
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
        id: 4,
        role: "prof",
        prenom: "Alice",
        nom: "Johnson",
        email: "alicejohnson@test.com",
        password: "password101",
        eleves: []
    },
    {
        id: 5,
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
    },
]

module.exports = users;

const API_URL = "http://localhost:5000";

export const fetchHelloMessage = async () => {
    const response = await fetch(`${API_URL}/hello`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération du message du backend");
    }

    return response.json();
};

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
    }

    return response.json();
};

export const loginAdmin = async (email, password) => {
    const response = await fetch(`${API_URL}/login-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
    }

    return response.json();
};

export const fetchData = async (endpoint, token) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};

export const fetchNotes = async () => {
    const token = localStorage.getItem("token"); // Récupérer le token pour l'authentification
    const response = await fetch(`${API_URL}/student/notes`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des notes");
    }

    return response.json();
};

export const fetchUserAccount = async (token) => {
    const response = await fetch(`${API_URL}/account`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données utilisateur");
    }

    return response.json();
};

export const fetchClasses = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/classes`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des classes");
    }

    return response.json();
};

export const addClass = async (newClass) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/classes`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newClass),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la classe");
    }

    return response.json();
};

export const updateClass = async (id, updatedClass) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/classes/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedClass),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la classe");
    }

    return response.json();
};

export const deleteClass = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/classes/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la classe");
    }
};

export const fetchCours = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/cours`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des cours");
    }

    return response.json();
};

export const addCours = async (newCours) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/cours`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCours),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du cours");
    }

    return response.json();
};

export const updateCours = async (id, updatedCours) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/cours/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCours),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du cours");
    }

    return response.json();
};

export const deleteCours = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/cours/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la suppression du cours");
    }
};

export const fetchEleves = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/eleves`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des élèves");
    }

    return response.json();
};

export const addEleve = async (newEleve) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/eleves`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newEleve),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'élève");
    }

    return response.json();
};

export const updateEleve = async (id, updatedEleve) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/eleves/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEleve),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'élève");
    }

    return response.json();
};

export const deleteEleve = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/eleves/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'élève");
    }
};


export const fetchFilieres = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/filieres`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des filières");
    }

    return response.json();
};

export const addFiliere = async (newFiliere) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/filieres`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newFiliere),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la filière");
    }

    return response.json();
};

export const updateFiliere = async (id, updatedFiliere) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/filieres/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFiliere),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la filière");
    }

    return response.json();
};

export const deleteFiliere = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/filieres/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la filière");
    }
};


export const fetchProfs = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/profs`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des professeurs");
    }

    return response.json();
};

export const addProf = async (newProf) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/profs`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProf),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du professeur");
    }

    return response.json();
};

export const updateProf = async (id, updatedProf) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/profs/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProf),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du professeur");
    }

    return response.json();
};

export const deleteProf = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/profs/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la suppression du professeur");
    }
};

export const fetchSessions = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/sessions`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des sessions");
    }

    return response.json();
};

export const addSession = async (newSession) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/sessions`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newSession),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la session");
    }

    return response.json();
};

export const updateSession = async (id, updatedSession) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/sessions/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSession),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la session");
    }

    return response.json();
};

export const deleteSession = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/sessions/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la session");
    }
};
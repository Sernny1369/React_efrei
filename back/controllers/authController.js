exports.login = (req, res) => {
    const { email, password } = req.body;
    const users = readJSON(USERS_PATH);
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ error: 'Identifiants invalides' });
  
    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
      },
      SECRET_KEY,
      { expiresIn: '2h' }
    );
  
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  };
  
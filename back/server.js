const app = require('./app');
const { PORT } = require('./config');

app.listen(PORT, () => console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`));
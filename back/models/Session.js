const path = require('path');
const { readJSON, writeJSON } = require('../utils/fileManager');
const DATA_PATH = path.join(__dirname, '../data/sessions.json');

exports.getAll = () => readJSON(DATA_PATH);
exports.saveAll = sessions => writeJSON(DATA_PATH, sessions);
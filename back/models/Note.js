const path = require('path');
const { readJSON, writeJSON } = require('../utils/fileManager');
const DATA_PATH = path.join(__dirname, '../data/notes.json');

exports.getAll = () => readJSON(DATA_PATH);
exports.saveAll = notes => writeJSON(DATA_PATH, notes);
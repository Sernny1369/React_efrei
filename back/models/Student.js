const path = require('path');
const { readJSON, writeJSON } = require('../utils/fileManager');
const DATA_PATH = path.join(__dirname, '../data/students.json');

exports.getAll = () => readJSON(DATA_PATH);
exports.saveAll = students => writeJSON(DATA_PATH, students);
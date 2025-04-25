const path = require('path');
const { readJSON, writeJSON } = require('../utils/fileManager');
const DATA_PATH = path.join(__dirname, '../data/courses.json');

exports.getAll = () => readJSON(DATA_PATH);
exports.saveAll = courses => writeJSON(DATA_PATH, courses);
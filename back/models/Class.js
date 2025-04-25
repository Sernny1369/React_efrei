const path = require('path');
const { readJSON, writeJSON } = require('../utils/fileManager');
const DATA_PATH = path.join(__dirname, '../data/classes.json');

exports.getAll = () => readJSON(DATA_PATH);
exports.saveAll = classes => writeJSON(DATA_PATH, classes);
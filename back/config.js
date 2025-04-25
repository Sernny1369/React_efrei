require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  SECRET_KEY: process.env.SECRET_KEY || 'votre_cle_secrete'
};
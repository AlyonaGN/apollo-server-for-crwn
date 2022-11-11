import firebase from 'firebase-admin';
const config = require('./config');
module.exports = firebase.initializeApp(config.firebaseConfig);

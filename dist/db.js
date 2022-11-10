import firebase from 'firebase-admin';
import { config } from './config.js';
export const firebaseDB = firebase.initializeApp(config.firebaseConfig);

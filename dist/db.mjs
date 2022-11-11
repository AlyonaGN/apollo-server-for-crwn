import firebase from 'firebase-admin';
import { config } from './config.mjs';
export const firebaseDB = firebase.initializeApp(config.firebaseConfig);

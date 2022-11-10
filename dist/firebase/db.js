import firebase from 'firebase-admin';
import { config } from './config';
export const firebaseDB = firebase.initializeApp(config.firebaseConfig);

import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

console.log('Firebase Service Account Path:', serviceAccountPath);
console.log('Firebase Storage Bucket:', storageBucket);

if (!serviceAccountPath) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY_PATH is not defined.');
}

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: storageBucket
});

export const bucket = admin.storage().bucket();

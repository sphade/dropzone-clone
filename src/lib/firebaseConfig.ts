// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { browser } from '$app/environment';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDLMrko0rodwnZUY9x9a3mNOVYD6ngTvq4',
	authDomain: 'dropbox-clone-21716.firebaseapp.com',
	projectId: 'dropbox-clone-21716',
	storageBucket: 'dropbox-clone-21716.appspot.com',
	messagingSenderId: '789840958993',
	appId: '1:789840958993:web:0f37ac743111ba13c443b0',
	measurementId: 'G-V4VN631TWT'
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
if (browser) {
	getAnalytics(app);
}

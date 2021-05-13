
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
   
var firebaseConfig = {
	apiKey: 'AIzaSyDclgDvaoMf9Hy04cDgsPEYNIu1pheIsGE',
	authDomain: 'react-blog-c0bb2.firebaseapp.com',
	projectId: 'react-blog-c0bb2',
	storageBucket: 'react-blog-c0bb2.appspot.com',
	messagingSenderId: '198026486445',
	appId: '1:198026486445:web:27230dac2490e05f3c9c24',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
export const auth = firebase.auth();
export const firestore = firebase.firestore;
export default db;

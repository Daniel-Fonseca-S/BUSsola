// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBaN1nCCKTL_vZheKvUi4D22Hv9_qE0Au8",
	authDomain: "bussola-e3b33.firebaseapp.com",
	databaseURL: "https://bussola-e3b33-default-rtdb.firebaseio.com",
	projectId: "bussola-e3b33",
	storageBucket: "bussola-e3b33.appspot.com",
	messagingSenderId: "1044879525115",
	appId: "1:1044879525115:web:4defd7d62b742bee825c5e"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const auth = getAuth(firebase);

export default firebase;
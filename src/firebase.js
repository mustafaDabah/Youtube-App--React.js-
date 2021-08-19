import firebase from 'firebase'

 var firebaseConfig = {
    apiKey: "AIzaSyCFtMDocDchpM6xz8hEHe5ssPer9rRnR7w",
    authDomain: "driven-manifest-321100.firebaseapp.com",
    projectId: "driven-manifest-321100",
    storageBucket: "driven-manifest-321100.appspot.com",
    messagingSenderId: "431532661969",
    appId: "1:431532661969:web:7f5aec3e8e514a4145f9f0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {  auth , provider }; 

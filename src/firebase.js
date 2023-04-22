import { initializeApp } from "firebase/app";

// Configure o Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDOFBbjbWKWXBtAUrWwUPLrh5WmStjBt0A",
    authDomain: "gestao-mel.firebaseapp.com",
    projectId: "gestao-mel",
    storageBucket: "gestao-mel.appspot.com",
    messagingSenderId: "571914735835",
    appId: "1:571914735835:web:af772cd523cc300280bcfe"
  };

const app = initializeApp(firebaseConfig);

export default app;

import { useState } from 'react'; 
import { initializeApp } from "firebase/app";
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Login from "./components/Login";

// import { getAnalytics } from "firebase/analytics";

import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyBjBwVlOOdgvoqrQQmN8yJn5pvbx14uJ44",
  authDomain: "invoicing-test-23f3c.firebaseapp.com",
  projectId: "invoicing-test-23f3c",
  storageBucket: "invoicing-test-23f3c.appspot.com",
  messagingSenderId: "133095410928",
  appId: "1:133095410928:web:74a597e73eb02f65678635",
  measurementId: "G-F1N0J6C5H3"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

const auth = getAuth();


async function signIn() {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, "jgarrettcorbin@gmail.com", "password")
    const user = userCredential.user;
    console.log(user);
  }
  catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage)
  }

}

async function addData() {
  // console.log(db);
  try {
    const docRef = await addDoc(collection(db, "invoices"), {
      client: "Client 1",
      bill: 100.00
    });
    console.log("Document written with ID: ", docRef.id);
  } 
  catch (e) {
    console.error("Error adding document: ", e);
  }
}



function App() {
  const [ showLogin, setShowLogin ] = useState(false);

  async function getData() {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    } 
    catch (e: any) {
      if (e.code === "permission-denied") {
        setShowLogin(true);
      } else {
        console.error(e);
      }
    }
  }

  return (
    <div>
      <button onClick={addData}>add data</button>
      <button onClick={getData}>get data</button>
      {/* <button onClick={createUser}>create user</button> */}
      <button onClick={signIn}>sign in</button>
      { showLogin && <Login />}
    </div>
  );
}

export default App;



// function createUser() {
// createUserWithEmailAndPassword(auth, "jgarrettcorbin@gmail.com", "password")
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     console.log(user);
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorCode, errorMessage);
//     // ..
//   });
// }
import { useState, useEffect } from 'react'; 
import { initializeApp } from "firebase/app";
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc, getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import Login from "./components/Login";
import JobList from './components/JobList';
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
const db = getFirestore(app);
const auth = getAuth();

async function addData() {
  // console.log(db);
  try {
    const docRef = await addDoc(collection(db, "invoices"), {
      client: "Client 2",
      date: Date.now(),
      bill: 100.00
    });
    console.log("Document written with ID: ", docRef.id);
  } 
  catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function deleteData(id: string) {
  try {
    await deleteDoc(doc(db, "invoices", id));
    console.log("Document written with ID: ", id);
  } 
  catch (e) {
    console.error("Error deleting document: ", e);
  }
}

async function updateData(id: string, newData: object) {
  // console.log(db);
  try {
    await updateDoc(doc(db, "invoices", id), newData);
    console.log("Document updated with ID: ", id);
  } 
  catch (e) {
    console.error("Error updating document: ", e);
  }
}


function App() {
  const [ showLogin, setShowLogin ] = useState(false);
  const [ data, setData ] = useState<object[]>([]);

  async function getData() {
    try {
      const querySnapshot = await getDocs(collection(db, "invoices"));
      const array: object[] = [];
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        array.push({...doc.data(), id: doc.id});
        setData(array);
      });
    } 
    catch (e: any) {
      console.error(e);
      if (e.code === "permission-denied") {
        setShowLogin(true);
      } else {
        console.error(e);
      }
    }
  }

  useEffect(() => {
    getData();
  },[]);
  useEffect(() => {
    getData();
  },[showLogin]);

  return (
    <div>
      <button onClick={addData}>add data</button>
      <button onClick={getData}>get data</button>
      

      {/* <button onClick={createUser}>create user</button> */}
      {/* <button onClick={signIn}>sign in</button> */}
      { showLogin && <Login auth={auth} setShowLogin={setShowLogin}/>}


      <br></br>
      <br></br>
      <JobList data={data} methods={{deleteData, updateData}}/>
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
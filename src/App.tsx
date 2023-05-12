import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore"; 
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
  return (
    <div>
      <button onClick={addData}>add data</button>
    </div>
  );
}

export default App;

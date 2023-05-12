import { useState } from 'react';
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import './Login.css';

interface Props{
    auth: Auth;
    setShowLogin: (x: boolean) => void;
}

export default function Login({auth, setShowLogin}: Props) {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    async function signIn() {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          const user = userCredential.user;
          console.log(user);
          setShowLogin(false);
        }
        catch (error: any) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage)
        }
      
      }
    return (
        <div id="login-overlay">
            <div id="login">
                Login

                <br></br>
                <br></br>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />

                <br></br>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />

                <br></br>

                <input type="submit" onClick={signIn} />


                <br></br>
                <br></br>

            </div>
        </div>
  )
}

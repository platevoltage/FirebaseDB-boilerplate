import React from 'react';
import './Login.css';

export default function Login() {
  return (
    <div id="login-overlay">
        <div id="login">
            Login

            <br></br>
            <br></br>

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />

            <br></br>

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />

            <br></br>
            <input type="submit" value="Submit" />
        </div>
    </div>
  )
}

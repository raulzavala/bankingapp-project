import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function createUser(credentials) {
  const API = process.env.BACKEND;
  const { name } = credentials;
  const { email } = credentials;
  const { password } = credentials;
  return fetch(
    `${API}/account/create/` +
      `${name}` +
      "/" +
      `${email}` +
      "/" +
      `${password}`,
    {
      method: "GET",
    }
  )
    .then((data) => data.json())
    .then((responseJSON) => {
      console.log(responseJSON);
    });
}

async function loginUser(credentials) {
  const { username } = credentials;
  const { password } = credentials;
  return fetch(`${API}/account/login/` + `${username}` + "/" + `${password}`, {
    method: "GET",
  }).then((data) => data.json());
}

async function findUser(email) {
  return fetch(`${API}/account/findOne/` + `${email}`, {
    method: "GET",
  }).then((data) => data.json());
}

export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const ctx = React.useContext(UserContext);

  const firebaseConfig = {
    apiKey: "AIzaSyANGvlpq9-eTYdUlWo8c2WMiuAHidw5O6s",
    authDomain: "login-e4dcc.firebaseapp.com",
    projectId: "login-e4dcc",
    storageBucket: "login-e4dcc.appspot.com",
    messagingSenderId: "359216540029",
    appId: "1:359216540029:web:61760bc9b43a439a2e0414",
  };

  const handleGoogleSignIn = (e) => {
    console.log("google sign in clicked");
    const firebase = initializeApp(firebaseConfig);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (user) {
          //Look for user in DB
          const userFound = await findUser(user.email);
          const { email } = userFound;
          //Found
          if (email != "") {
            navigate("/home");
            ctx.users[0] = token;
            console.log(ctx.users[0]);
          } else {
          }
        } else {
        }
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });

    const { email } = token;
    if (email != "") {
      navigate("/home");
      ctx.users[0] = token;
      console.log(ctx.users[0]);
    }
  };

  return (
    <div className="login">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" size="lg">
          Submit
        </Button>
        <br></br>
        <Button
          variant="secondary"
          type="button"
          className="boton_sign"
          onClick={(e) => handleGoogleSignIn(e.target.value)}
        >
          Login with Google
        </Button>
      </Form>
    </div>
  );
}

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';

async function loginUser(credentials) {
    const {username} = credentials;
    const {password} = credentials;
  return fetch("http://localhost:3002/account/login/"+`${username}`+"/"+`${password}`, {
    method: "GET"
  }).then((data) => data.json());

}

export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    console.log(token);

    const {email} = token;
    if(email!=""){
        navigate('/home');
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
        <Button variant="secondary" type="button" className="boton_sign">
          Login with Google
        </Button>
      </Form>
    </div>
  );
}
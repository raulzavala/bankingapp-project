import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React from "react";
import { UserContext } from "../App";

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

function Register() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);

  const fieldsCheck = () => {
    if (name !== "" && email !== "" && password !== "") {
      return true;
    } else {
      return false;
    }
  };

  const validate = (field, label) => {
    if (!field) {
      setStatus("Please complete the " + label + " field");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  };

  const handleCreate = async (e) => {
    console.log(name, email, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    const user = createUser({
      name,
      email,
      password,
    });

    ctx.users.push({ name, email, password, balance: 0, transactions: [] });
    setShow(false);
    e.preventDefault();

    if (user != null) {
      window.alert("User was created");
    }
    clearForm(e);
  };

  const clearForm = (e) => {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  };

  return (
    <div className="login">
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          size="lg"
          onClick={(e) => handleCreate(e)}
          title="Create a New Account"
        >
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;

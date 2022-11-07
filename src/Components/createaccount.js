import React from "react";
import Card from "./context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {UserContext} from "../App";

const CreateAccount = () => {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext)

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

  const handleCreate = (e) => {
    console.log(name, email, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    ctx.users.push({ name, email, password, balance: 100, transactions:[] });
    console.log(ctx);
    setShow(false);
    e.preventDefault();
  };

  const clearForm = (e) => {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  };

  return (
    <>
      <Card
        bgcolor="primary"
        header="User Account"
        status={status}
        body={
          show ? (
            <>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="input"
                    placeholder="Enter Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    title="Enter Full Name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="input"
                    placeholder="Enter Email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    title="Enter Email Address"
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    title="Enter Password"
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => handleCreate(e)}
                  title="Create a New Account"
                  disabled={!fieldsCheck()}
                >
                  Create Account
                </Button>
              </Form>
            </>
          ) : (
            <>
              <h5>Success</h5>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => clearForm(e)}
                title="Add Another Account"
              >
                Add another account
              </Button>
            </>
          )
        }
      />
    </>
  );
};

export default CreateAccount;

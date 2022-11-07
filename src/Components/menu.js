import React from "react";
import { Navbar, Container, Form, Button, Nav} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Bank } from "react-bootstrap-icons";
import { useLocation, Link } from "react-router-dom";
import App from "../App";
import CreateAccount from "./createaccount";

const Menu = () => {
  const location = useLocation();
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
      <LinkContainer to="/">
        <Navbar.Brand>
          <Bank width="30" height="30" title="BadBank logo" id="logo" />
        </Navbar.Brand>
        </LinkContainer>

        <Nav className="me-auto" activeKey={location.pathname}>
        <LinkContainer to="/createaccount/">
          <Nav.Link
            eventKey="/createaccount/"
            title="Start Creating a New Account"
          >
            Create Account
          </Nav.Link>
          </LinkContainer>

          {/* <Nav.Link href="/login/">Login</Nav.Link> */}
          <LinkContainer to="/deposit/">
          <Nav.Link
            eventKey="/deposit/"
            title="Make a New Deposit"
          >
            Deposit
          </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/withdraw/">
          <Nav.Link
            eventKey="/withdraw/"
            title="Make a New Withdraw"
          >
            Withdraw
          </Nav.Link>
          </LinkContainer>
        
          <LinkContainer to="/balance/">
          <Nav.Link
            eventKey="/balance/"
            title="View Balance"
          >
            Balance
          </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/alldata/">
          <Nav.Link title="Show Data">
            All Data
          </Nav.Link>
          </LinkContainer>

        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            title="Search something..."
          />
          <Button variant="outline-success" title="Show me results">
            Search
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
};
export default Menu;

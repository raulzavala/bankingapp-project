import React from "react";
import { Navbar, Container, Form, Button, Nav} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Bank } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import { UserContext } from "../App";

const Menu = () => {
  const location = useLocation();
  const ctx = React.useContext(UserContext);

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
      <LinkContainer to="/home">
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

          <LinkContainer to="/">
          <Nav.Link title="Log out">
            Log out
          </Nav.Link>
          </LinkContainer>

        </Nav>
        <label className="logged">
          Logged as {ctx.users[0].name}
       </label>
      </Container>
    </Navbar>
  );
};
export default Menu;

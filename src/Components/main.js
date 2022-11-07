import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Login from '././login';
import Register from '././register';

function Main() {
    return (
      <Tabs
        defaultActiveKey="login"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="login" title="Log-in">
          <Login />
        </Tab>
        <Tab eventKey="signup" title="Sign-up">
          <Register />
        </Tab>
      </Tabs>
    );
  }
  
  export default Main;
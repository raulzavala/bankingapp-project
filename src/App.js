import "./App.css";
import Home from "./Components/home";
import CreateAccount from "./Components/createaccount";
import Deposit from "./Components/deposit";
import Withdraw from "./Components/withdraw";
import Balance from "./Components/balance";
import AllData from "./Components/alldata";
import Main from "./Components/main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

export const UserContext = React.createContext();

const App = () => {
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          users: [
            {
              name: "Raul Zavala",
              email: "iscraulzavala@gmail.com",
              password: "secret",
              balance: 50,
              transactions: [{transactionType:"Deposit",amount:"20"}]
            },
          ],
        }}
      >
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Home />} exact />
          <Route exact path="/createaccount/" element={<CreateAccount />} />
          <Route exact path="/deposit/" element={<Deposit />} />
          <Route exact path="/withdraw/" element={<Withdraw />} />
          <Route exact path="/balance/" element={<Balance />} />
          <Route exact path="/alldata/" element={<AllData />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;

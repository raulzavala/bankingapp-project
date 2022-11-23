import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "./context";
import React from "react";
import { UserContext } from "../App";
import Menu from "./menu";

async function makeDeposits(credentials) {
  const API = "https://backend-bankingapp.herokuapp.com";
  const { value } = credentials;
  const { email } = credentials;
  return fetch(
    `${API}/account/update/` + `${email}` + "/" + `${value}` + "/Deposit",
    {
      method: "GET",
    }
  )
    .then((data) => console.log(data.json()))
    .then((responseJSON) => {
      console.log(responseJSON);
    });
}

const Deposit = () => {
  const [amount, setAmount] = React.useState(0);
  const userctx = React.useContext(UserContext);
  const [index, setIndex] = React.useState(0);
  const [total, setTotal] = React.useState(userctx.users[0].balance);

  const makeDeposit = async (value, e) => {
    let Ntotal = parseFloat(value) + parseFloat(total);
    setTotal(Ntotal);
    e.preventDefault();
    console.log(userctx);

    const email = userctx.users[index].email;
    const deposit = await makeDeposits({
      email,
      value,
    });

    userctx.users[index].balance = Ntotal;
    userctx.users[index].transactions.push({
      transactionType: "Deposit",
      amount: value,
    });
    console.log(userctx);
    window.alert("Deposit was received");
    setAmount("");
  };

  const handleTotal = (value, e) => {
    setTotal(userctx.users[value].balance);
  };

  const handleSelect = (value, e) => {
    setIndex(value);
    e.preventDefault();
  };

  const isNumber = (str) => {
    if (str < 0) {
      return alert("A negative number");
    }

    if (isNaN(str)) {
      return alert("Not a  number");
    }
  };

  const fieldsCheck = () => {
    if (amount !== 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Menu />
      <Card
        bgcolor="primary"
        id="account"
        title="Account"
        body={
          <div id="balanceAccount">
            <select onChange={(e) => handleTotal(e.target.value, e)}>
              {userctx.users.map((item, j) => (
                <option value={j} onClick={(e) => handleSelect(j, e)} key={j}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        }
      />
      <Card
        bgcolor="primary"
        id="balance"
        title="Current Balance"
        body={
          <div id="balancePanel">
            <h4 id="balanceValue">$ {total}</h4>
          </div>
        }
      />
      <Card
        bgcolor="primary"
        header="Make a New Deposit"
        className="deposit"
        body={
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter a Deposit"
                id="deposit"
                title="Enter a Deposit"
                value={amount}
                onChange={(e) => {
                  setAmount(e.currentTarget.value);
                  isNumber(e.currentTarget.value);
                }}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              title="Make a Deposit"
              onClick={(e) => makeDeposit(amount, e)}
              disabled={!fieldsCheck()}
            >
              Make Deposit
            </Button>
          </Form>
        }
      />
    </>
  );
};

export default Deposit;

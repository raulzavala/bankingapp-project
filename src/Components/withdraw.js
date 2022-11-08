import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "./context";
import React from "react";
import { UserContext } from "../App";
import Menu from "./menu";

const Withdraw = () => {
  const [amount, setAmount] = React.useState(0);
  const userctx = React.useContext(UserContext);
  const [total, setTotal] = React.useState(userctx.users[0].balance);
  const [index, setIndex] = React.useState(0);

  const makeWithdraw = (value, e) => {
    let Ntotal = 0;
    if (amount > total) {
      window.alert("Withdraw overdraft");
    } else {
      Ntotal = parseFloat(total) - parseFloat(value);
      setTotal(Ntotal);
      userctx.users[index].balance = Ntotal;
      userctx.users[index].transactions.push({
        transactionType: "Withdraw",
        amount: value,
      });
      console.log(userctx);
      setAmount("");
      window.alert("Withdraw was processed");
    }
    e.preventDefault();
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
        header="Make a Withdraw"
        className="withdraw"
        body={
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter an Amount"
                id="withdraw"
                title="Enter an Amount"
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
              title="Make a Withdraw"
              onClick={(e) => makeWithdraw(amount, e)}
              disabled={!fieldsCheck()}
            >
              Make Withdraw
            </Button>
          </Form>
        }
      />
    </>
  );
};

export default Withdraw;

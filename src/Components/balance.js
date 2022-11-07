import React from "react";
import { UserContext } from "../App";
import Card from "./context";

const Balance = () =>{

  const ctx = React.useContext(UserContext);
  const [index, setIndex] = React.useState(0);
  const [total, setTotal] = React.useState(ctx.users[0].balance);

  const handleTotal = (value, e) => {
    setTotal(ctx.users[value].balance);
  };

  const handleSelect = (value, e) => {
    setIndex(value);
    e.preventDefault();
  };


  return (
    <>
      <Card
          bgcolor="primary"
          id="account"
          title="Account"
          body={
            <div id="balanceAccount">
              <select onChange={(e) => handleTotal(e.target.value, e)}>
                {ctx.users.map((item, j) => (
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
    </>
  )
}

export default Balance;
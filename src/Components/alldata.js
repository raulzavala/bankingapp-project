import React from "react";
import { UserContext } from "../App";
import Card from "./context";
import Table from "react-bootstrap/Table";

function AllData() {
  const ctx = React.useContext(UserContext);
  const [index, setIndex] = React.useState(0);

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
              <select>
                {ctx.users.map((item, j) => (
                  <option value={j} onClick={(e) => handleSelect(j, e)} key={j}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          }
        />
      <div style={{ maxWidth: "65em", padding: "20px", marginLeft: "100px"}}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
              {ctx.users[index].transactions.map((item, j) => (
                <tr>
                  <td>{j+1}</td>
                  <td>{item.transactionType}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default AllData;

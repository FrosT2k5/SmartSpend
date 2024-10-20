import React from 'react'
import classes from '../routes/css/dashboard.module.css';
import { Form, useLoaderData } from 'react-router-dom';

function Balance() {
  const { userData, transactions } = useLoaderData()
  return (
    <>
      <div className={classes.headingBox}>
        <h4 className={classes.textBold}> Balance </h4>
        <h4> Check your account balance, transaction history and add new transactions. </h4>
      </div>

      <div className={classes.smallBox}>
        <p className={classes.textBold}>
          Balance Data:
        </p>
        <h4>
          Current Balance: <span className={classes.textBold}>
          ₹ { Number((userData.currentBalance).toFixed(1)).toLocaleString() }
          </span>
        </h4>
        <h4>
          Monhtly Income: 
          <span className={classes.textBold}>
          ₹ { Number((userData.monthlyIncome).toFixed(1)).toLocaleString() }
          </span>
        </h4>
        <h4>
          Amount spent this month: <span className={classes.textBold}>
          ₹ calc
          </span>    
        </h4>
        <h4>
          Remaining from this month: <span className={classes.textBold}>
          ₹ calc
          </span>
        </h4>
        <h4>
          Days remaining till next income: <span className={classes.textBold}>
          ₹ calc
          </span>
        </h4>
      </div>

      <div className={classes.smallBox}>
        <p className={classes.textBold}>
          Add/Remove money
        </p>
        <Form method='POST'>
          <p>Transaction Description</p>
          <input type='text' name='description'></input>

          <p>Transaction Amount</p>
          <input type='text' name='amount'></input>

          <p>Transaction type:</p>
          <select name="type" id="type" className={classes.displayInline}>
            <option value="add">Add Money</option>
            <option value="sub">Subtract Money</option>
          </select>

          <button type='submit' className={classes.submitButton}>
            Submit
          </button>
        </Form>
      </div>

      <div className={classes.largeBoxLong}>
        <h2 >Transactions:</h2>
        <div style={ {overflow: "scroll", padding: "10px", height: "84%"} }>
          <table >
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
            {
              transactions.toReversed().map( (transaction, index) => {
                return <tr key={index}>
                  <td>{ transaction.description }</td>
                  <td style={ {color: transaction.amount > 0 ? "green" : "red"} }
                    >
                  { (transaction.amount) }
                  </td>
                  <td>{ new Date(transaction.date).toLocaleString()}</td>
                </tr>
              }) } 
          </table>
        </div>
      </div>
    </>
  )
}

export default Balance
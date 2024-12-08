import React from 'react'
import classes from '../routes/css/dashboard.module.css';
import { Form, useLoaderData } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);
function Expenses() {
  const { userData, expenses } = useLoaderData();

  const PAYMENT_METHODS = ['Cash', 'Credit Card', 'Debit Card', 'Net Banking', 'UPI', 'Others']
  let totalExpenses = 0;
  let totalUsedAmount = 0;
  let expensesTypes = "";

  let expensesData = {
    labels: [],
    datasets: [{
      label: "Statistics",
      data: [],
      borderWidth: 1,
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
    }]
  }
  const options = {
    maintainAspectRatio: false,
  }

  expenses.forEach(element => {
    totalExpenses += element.currentAmount + element.usedValue ;
    totalUsedAmount += element.usedValue;
    expensesTypes += element.name + ", "
    expensesData.labels.push(element.name);
    expensesData.datasets[0].data.push(element.currentAmount + element.usedValue);
  });
  expensesTypes = expensesTypes.slice(0, -2)

  return (
    <>
      <div className={classes.headingBox}>
        <h4 className={classes.textBold}> Expenses </h4>
        <h4> Check your account expenses, add new expenses and update existing ones. </h4>
      </div>

      <div className={classes.smallBox}>
        <p className={classes.textBold}>
          Expenses Data:
        </p>
        <h4>
          Total Expenses: <span className={classes.textBold}>
          ₹ { Number((totalExpenses).toFixed(1)).toLocaleString() }
          </span>
        </h4>
        <h4>
          Amount used: <span className={classes.textBold}>
          ₹ { Number((totalUsedAmount).toFixed(1)).toLocaleString() }
          </span>
        </h4>
        <h4>
          Account Balance: <span className={classes.textBold}>
          ₹ { Number((userData.currentBalance).toFixed(1)).toLocaleString() }
          </span>
        </h4>
        <h4>
          Number of Expenses: {" "}
          <span className={classes.textBold}>
            { expenses.length }
          </span>
        </h4>
        <h4>
          Types of expenses: <span className={classes.textBold}>
          { expensesTypes }
          </span>    
        </h4>
        <h4>
          Income to expense ratio: <span className={classes.textBold}>
          { Math.round((totalUsedAmount/userData.monthlyIncome)*100) } %
          </span>
        </h4>
      </div>

      <div className={classes.smallBoxLong}>
        <p className={classes.textBold}>
          Expenses Graph:
        </p>
        <div className={classes.graphDivMedium}>
          <Doughnut 
            options={options} 
            data={expensesData}  
            width={100}
            height={50} 
          />
        </div>
      </div>

      <div className={classes.smallBox}>
        <p className={classes.textBold}>
          Add New Expense:
          <Form method='POST'>

            <p>Name</p>
            <input type='text' name='name' required={true}></input>
            <input type="hidden" name="_action" value="addExpense" required={true}/>

            <p>Amount:</p>
            <input type='number' name='amount' required={true}></input>

            <p>Mode of Payment</p>
            <select name='mode'>
              {PAYMENT_METHODS.map((invOption, index) => <option value={invOption} key={index}>
                {invOption}
              </option>)}
            </select>

            <button type='submit' className={classes.submitButton}>
              Submit
            </button>
          </Form>
        </p>
      </div>

      {expenses.map((expense, index) => <div className={classes.largeBoxLong} key={index}>
        <div className={classes.boxFlex}>
          <div style={{ width: "200px"}}>
            <h4 className={classes.textBold}>EXPENSE INFO </h4>
            <h4>
              Expense Name: <span className={classes.textBold}> { expense.name }
              </span>    
            </h4>
            <h4>
              Total Value: <span className={classes.textBold}>
              { expense.currentAmount + expense.usedValue }
              </span>    
            </h4>
            <h4>
              Used Value: <span className={classes.textBold}>
              { expense.usedValue }
              </span>    
            </h4>
            <h4>
              Payment Method: <span className={classes.textBold}>
              { expense.modeOfPayment }
              </span>    
            </h4>

            <progress 
                value={ Math.round( 
                    ( expense.usedValue / 
                    (expense.currentAmount + expense.usedValue ) ) * 100 
                  )}
                style={{margin: "0"}}
                max="100"> 
                { Math.round( 
                  ( expense.usedValue / 
                  (expense.currentAmount + expense.usedValue ) ) * 100 
                ) } % 
              </progress>
              { Math.round( 
                  ( expense.usedValue / 
                  (expense.currentAmount + expense.usedValue ) ) * 100 
                ) } %
          </div>

          <hr color='#d9d9d9'/>
          <Form method='POST'>
            <p> New Transaction Description</p>
            <input type='text' name='description'></input>

            <p>Transaction Amount</p>
            <input type='number' name='amount'></input>

            <p>Transaction type:</p>
            <select name="type" id="type" className={classes.displayInline}>
              <option value="add">Add spent money</option>
              <option value="sub">Remove spent money</option>

            </select>
            <input type="hidden" name="_action" value="updateExpense" required={true}/>
            <input type="hidden" name="_expenseId" value={index+1}  required={true}/>
            <button type='submit' className={classes.submitButton}>
              Submit
            </button>
          </Form>

          <hr color='#d9d9d9'/>

          <Form method='POST'>
            <h4 className={classes.textBold}> Delete Expense </h4>
            <p> To Confirm <span className={classes.textRed}>Delete</span>,  </p>
            <p>Enter expense name: </p>
            <input type='text' name='name'></input>
            <input type="hidden" name="_action" value="deleteExpense" required={true}/>
            <input type="hidden" name="_expenseId" value={index+1}  required={true}/>
            <input type="hidden" name="_expenseName" value={expense.name}  required={true}/>
            <button type='submit' className={classes.submitButton}>
              Submit
            </button>
          </Form>
        </div>


        <hr color='#d9d9d9'></hr>
        <h4 className={classes.textBold}> Transactions </h4>
        <div style={ {overflow: "scroll", padding: "10px", height: "135px"} }>
            <table >
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
              {
                expense.transactions.toReversed().map( (transaction, index) => {
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
        </div> )
        }
    </>
  )
}

export default Expenses
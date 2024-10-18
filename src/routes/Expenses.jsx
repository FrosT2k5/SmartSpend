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
          Total amount spent: <span className={classes.textBold}>
          ₹ calc
          </span>
        </h4>
        <h4>
          Income to expense ratio: <span className={classes.textBold}>
          ₹ calc
          </span>
        </h4>
      </div>

      <div className={classes.smallBox}>
        <p className={classes.textBold}>
          Investment Graph:
        </p>
        <div className={classes.graphDivSmall}>
          <Doughnut 
            options={options} 
            data={expensesData}  
            width={100}
            height={50} 
          />
        </div>
      </div>


      {expenses.map((expense) => <div className={classes.largeBoxLong} key={expense.investmentId}>
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
              { expense.currentAmount }
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
              <option value="add">Add Money</option>
              <option value="sub">Subtract Money</option>
            </select>
            <input type="hidden" name="_action" value="updateInvestment" required={true}/>
            <input type="hidden" name="_investmentId" value={expense.investmentId}  required={true}/>
            <button type='submit' className={classes.submitButton}>
              Submit
            </button>
          </Form>

          <hr color='#d9d9d9'/>

          <Form method='POST'>
            <h4 className={classes.textBold}> Delete Investment </h4>
            <p> To Confirm <span className={classes.textRed}>Delete</span>,  </p>
            <p>Enter investment type: </p>
            <input type='text' name='type'></input>
            <input type="hidden" name="_action" value="deleteInvestment" required={true}/>
            <input type="hidden" name="_investmentId" value={expense.investmentId}  required={true}/>
            <input type="hidden" name="_investmentType" value={expense.type}  required={true}/>
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
                expense.transactions.map( (transaction, index) => {
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
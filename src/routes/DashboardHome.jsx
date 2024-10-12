import React from 'react'
import classes from '../routes/css/dashboard.module.css';
import { useLoaderData } from 'react-router-dom';


function DashboardHome() {

  const { userData, investments, expenses } = useLoaderData();

  let totalInvestments = 0;

  for (const investment of investments) {
    totalInvestments += investment.currentValue;
  };

  return (
    <>
      <div className={classes.headingBox}>
        <h4> Overview </h4>
        <h4> Welcome, {userData.name}. Financial Freedom begins with Planning. </h4>
      </div>

      <div className={classes.smallBox}>
        <p className={classes.textBold}>
          Balance: 
        </p>
          <h3>
            ₹ {Number((userData.currentBalance).toFixed(1)).toLocaleString()}
          </h3>
          <hr color='#d9d9d9'></hr>

          <div style={ {textAlign: "center", "marginTop": "15px"} }>
            <button>
              Add Money
            </button>

            <button>
              History
            </button>
          </div>
      </div>

      <div className={classes.smallBox}>
      <p className={classes.textBold}>
          Investments: 
        </p>
          <h3>
            ₹ {Number((totalInvestments).toFixed(1)).toLocaleString()}
          </h3>
          <hr color='#d9d9d9'></hr>

          <div style={ {textAlign: "center", "marginTop": "15px"} }>
            <button>
              Add Money
            </button>

            <button>
              History
            </button>
          </div>
      </div>

      {/* <div className={classes.smallBoxLong}>
        Small Box Longer
      </div>

      <div className={classes.smallBoxLong}>
        Small Box Longer
      </div> */}

      <div className={classes.largeBox} >
        <p className={classes.textBold}>
          Expenses:
        </p>

        <div style={ {overflow: "scroll", padding: "10px", height: "84%"} }>
          <table >
            <tr>
              <th>Name</th>
              <th>Total Value</th>
              <th>Used</th>
              <th>Ratio</th>
            </tr>

            {
              expenses.map( (expense, index) => {
                return <tr key={index}>
                  <td>{ expense.name }</td>
                  <td>{ (expense.currentAmount + expense.usedValue) }</td>
                  <td>{ expense.usedValue }</td>
                  <td>{ Math.round( (expense.usedValue / (expense.currentAmount + expense.usedValue )) * 100 ) } % </td>
                </tr>
              })
            }
          </table>
        </div>
      </div>

      {/* <div className={classes.largeBoxLong}>
        Large Box Longer
      </div> */}
    </>
  )
}

export default DashboardHome
import React from 'react'
import classes from '../routes/css/dashboard.module.css';
import { useLoaderData } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardHome() {

  const { userData, investments, expenses, transactions } = useLoaderData();

  let totalInvestments = 0;
  let totalExpenses = 0;
  let lastTransactions = 0

  for (const investment of investments) {
    totalInvestments += investment.currentValue;
  };

  for (const expense of expenses) {
    totalExpenses += expense.usedValue;
  };

  let i=0;
  for (const transaction of transactions) {
    lastTransactions += transaction.amount;
    i+=1;
    if (i>=5)
      break;
  }

  let transactionData = {
    labels: [ "Expenses", "Investments", "Last 5 Transactions" ],
    datasets: [{
      label: 'Statistics',
      data: [totalExpenses, totalInvestments, lastTransactions],
      borderWidth: 1,
      backgroundColor: "#2673DA",
    }]
  }

  const options = {
    maintainAspectRatio: false,
  }

  let investmentData = {
    labels: investments.map((investment) => investment.type),
    datasets: [{
      label: "Statistics",
      data: investments.map((investment) => investment.currentValue),
      borderWidth: 1,
      backgroundColor: "#2673DA",
    }]
  }

  return (
    <>
      <div className={classes.headingBox}>
        <h4 className={classes.textBold}> Overview </h4>
        <h4> Welcome, {userData.name}. Financial Freedom begins with Planning. </h4>
      </div>

      <div className={classes.smallBoxLong}>
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

            <div className={classes.graphDivMedium}>
              <Bar 
                options={options} 
                data={transactionData}  
                width={100}
                height={50} 
                />
            </div>
          </div>
      </div>

      <div className={classes.smallBoxLong}>
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
            <div className={classes.graphDivMedium}>
              <Bar 
                options={options} 
                data={investmentData}  
                width={100}
                height={50} 
                />
            </div>
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
                  <td>
                    <progress 
                      value={ Math.round( 
                          ( expense.usedValue / 
                          (expense.currentAmount + expense.usedValue ) ) * 100 
                        ) }
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
                  </td>
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
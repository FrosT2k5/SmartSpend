import React from 'react'
import classes from '../routes/css/dashboard.module.css';
import { Form, useLoaderData } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Investments() {
  const { userData, investments } = useLoaderData();
  const INVESTMENT_OPTIONS = ['RD', 'FD', 'MF', 'Gold', 'Real Estate']

  let totalInvestments = 0;
  let investmentTypes = "";
  let investmentData = {
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
  

  investments.forEach(element => {
    totalInvestments += element.currentValue ;
    investmentTypes += element.type + ", "
    investmentData.labels.push(element.type);
    investmentData.datasets[0].data.push(element.currentValue);
  });


  return (
  <>
    <div className={classes.headingBox}>
      <h4 className={classes.textBold}> Investments </h4>
      <h4> Check your investments, add new expenses and update existing ones. </h4>
    </div>

    <div className={classes.smallBox}>
      <p className={classes.textBold}>
        Investment Data:
      </p>
      <h4>
        Total Investments: <span className={classes.textBold}>
        ₹ { Number((totalInvestments).toFixed(1)).toLocaleString() }
        </span>
      </h4>
      <h4>
        Investments + Account Balance: <span className={classes.textBold}>
        ₹ { Number((totalInvestments + userData.currentBalance).toFixed(1)).toLocaleString() }
        </span>
      </h4>
      <h4>
        Number of Investments: {" "}
        <span className={classes.textBold}>
          { investments.length }
        </span>
      </h4>
      <h4>
        Types of investements: <span className={classes.textBold}>
        { investmentTypes }
        </span>    
      </h4>
      <h4>
        Amount invested this month: <span className={classes.textBold}>
        ₹ calc
        </span>
      </h4>
      <h4>
        Income to investement ratio: <span className={classes.textBold}>
        ₹ calc
        </span>
      </h4>
    </div>

    <div className={classes.smallBox}>
      <p className={classes.textBold}>
        Investment Graph:
      </p>
      <div className={classes.graphDivSmall}>
          <Pie 
            options={options} 
            data={investmentData}  
            width={100}
            height={50} 
          />
        </div>
    </div>

    <div className={classes.smallBox}>
      <p className={classes.textBold}>
        Add new investment:
        <Form method='POST'>
          <p>Investment Type</p>
          <select name='type'>
            {INVESTMENT_OPTIONS.map((invOption, index) => <option value={invOption} key={index}>
              {invOption}
            </option>)}
          </select>

          <p>Base Value</p>
          <input type='number' name='amount' required={true}></input>
          <input type="hidden" name="_action" value="addInvestment" required={true}/>

          <p>Rate of Interest:</p>
          <input type='number' name='interest' required={true}></input>
          <button type='submit' className={classes.submitButton}>
            Submit
          </button>
        </Form>
      </p>
    </div>

    {
      investments.map((investment) => <div className={classes.largeBoxLong} key={investment.investmentId}>

        <div className={classes.boxFlex}>
          <div style={{ width: "200px"}}>
            <h4>
              Investment Type: <span className={classes.textBold}> { investment.type }
              </span>    
            </h4>
            <h4>
              Investment ID: <span className={classes.textBold}> { investment.investmentId }
              </span>    
            </h4>
            <h4>
              Rate of Interest: <span className={classes.textBold}>
              { investment.rateOfInterest }
              </span>    
            </h4>
            <h4>
              Base Value: <span className={classes.textBold}>
              { investment.baseValue }
              </span>    
            </h4>
            <h4>
              Current Value: <span className={classes.textBold}>
              { investment.currentValue }
              </span>    
            </h4>
          </div>

          <hr color='#d9d9d9'/>
          
          <Form method='POST'>
            <p>Add New Transaction in investement</p>
            <select name='type'>
              {INVESTMENT_OPTIONS.map((invOption, index) => <option value={invOption} key={index}>
                {invOption}
              </option>)}
            </select>

            <p>Base Value</p>
            <input type='number' name='amount' required={true}></input>
            <input type="hidden" name="_action" value="updateInvestment" required={true}/>
            <input type="hidden" name="_action" value="updateInvestement"  required={true}/>
            <p>Rate of Interest:</p>
            <input type='number' name='interest' required={true}></input>
            <button type='submit' className={classes.submitButton}>
              Submit
            </button>
          </Form>
        </div>


      <hr color='#d9d9d9'></hr>
      <h2> Transactions </h2>
      <div style={ {overflow: "scroll", padding: "10px", height: "135px"} }>
          <table >
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
            {
              investment.transactions.map( (transaction, index) => {
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

export default Investments
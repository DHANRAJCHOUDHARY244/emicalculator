import React, { useState } from 'react';
import './input.css';
import PieChart from './Charts/PieChart';
import ReactTable from './ReactTable';
import AreaChart1 from './Charts/AreaChart';

function EmiCalculator() {
  const [principal, setPrincipal] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [tenureValue, setTenureValue] = useState(0);
  const [tenureType, setTenureType] = useState('years');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [interestRateError, setInterestRateError] = useState('');
  const [loanAmountError, setLoanAmountError] = useState('');
  const [tenureError, setTenureError] = useState('');
  const [pieData,setPieData]=useState([])
  const calculateEmi = () => {
    // Reset validation errors
    setInterestRateError('');
    setLoanAmountError('');
    setTenureError('');

    if (principal <= 0) {
      setLoanAmountError('Loan amount must be greater than 0');
      return;
    }

    if (tenureValue <= 0) {
      setTenureError('Tenure must be greater than 0');
      return;
    }

    if (interestRate < 1 || interestRate > 100) {
      setInterestRateError('Interest rate must be between 1 and 100');
      return;
    }

    const r = interestRate / 1200; // Monthly interest rate
    const n = tenureType === 'years' ? tenureValue * 12 : tenureValue; // Total number of installments
    const emiAmount = (principal * r * (Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

    setMonthlyPayment(emiAmount.toFixed(2));

    const totalPaymentValue = emiAmount * n;
    const totalInterestValue = totalPaymentValue - principal;

    setTotalInterest(totalInterestValue.toFixed(2));
    setTotalPayment(totalPaymentValue.toFixed(2));
    setPieData([
      { name: 'Monthly Payment', value: emiAmount.toFixed(2) },
      { name: 'Total Interest Payble', value: totalInterestValue.toFixed(2) },
      { name: 'Total Payment Payble', value: totalPaymentValue.toFixed(2) },
    ]);
    // Calculate the amortization schedule
    const schedule = [];
    let balance = principal;
    for (let i = 1; i <= n; i++) {
      const interestPayment = balance * r;
      const principalPayment = emiAmount - interestPayment;
      balance -= principalPayment;
      const loanPaidTillDate = principal - balance;
      const loanPaidPercentage = (loanPaidTillDate / principal) * 100;
      schedule.push({
        month: i,
        principalPayment: principalPayment.toFixed(2),
        interestPayment: interestPayment.toFixed(2),
        totalPayment: emiAmount.toFixed(2),
        balance: balance.toFixed(2),
        loanPaidTillDate: loanPaidTillDate.toFixed(2),
        loanPaidPercentage: loanPaidPercentage.toFixed(2),
      });
    }
    console.log(schedule);
    setAmortizationSchedule(schedule);
  };

  return (
    <div>
      <div className="input-fields">
        <div>
          <label className='inp-label' >Loan Amount (INR):</label>
          <input
            className='inp-box'
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
          {loanAmountError && (
            <p className="error-message">{loanAmountError}</p>
          )}
        </div>
        <div>
          <label className='inp-label'>Interest Rate (% per annum):</label>
          <input
            className='inp-box'
            type="number"
            min={1}
            max={100}
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
          {interestRateError && (
            <p className="error-message">{interestRateError}</p>
          )}
        </div>
        <div>
          <label className='inp-label'>Loan Tenure:</label>
          <input
            className='inp-box'
            type="number"
            value={tenureValue}
            onChange={(e) => setTenureValue(e.target.value)}
          />
          {tenureError && (
            <p className="error-message">{tenureError}</p>
          )}
          <label className='rad-label'>
            <input
              type="radio"
              name="tenureType"
              value="years"
              checked={tenureType === 'years'}
              onChange={() => setTenureType('years')}
            />
            Years
          </label>
          <label className='rad-label'>
            <input
              type="radio"
              name="tenureType"
              value="months"
              checked={tenureType === 'months'}
              onChange={() => setTenureType('months')}
            />
            Months
          </label>
        </div>
        <div class="btn">
          <button onClick={calculateEmi}>Calculate EMI</button>
        </div>
      </div>

      {monthlyPayment > 0 && (
        <>
          <div class="pie-sec">
          <div  className='pie-sec-wp'>
            <p className='pie-sec-p'> <span className="pie-sec-pt">Monthly Payment: ₹</span>  {monthlyPayment}</p>
            <p className='pie-sec-p'> <span className="pie-sec-pt">Total Interest Payable: ₹ </span> {totalInterest}</p>
            <p className='pie-sec-p'> <span className="pie-sec-pt">Total Payment (Principal + Interest): ₹</span>  {totalPayment}</p>
          </div>
            <PieChart data={pieData} />
          </div>
        </>
      )}
      {amortizationSchedule.length > 0 && (
        <div class="tab-cont">
        <AreaChart1 data={amortizationSchedule} />
          <h2>Amortization Schedule</h2>
          <ReactTable data={amortizationSchedule} />
        </div>
      )}
      <div class="footer">
        <p>Made By Dhanraj Choudhary</p>
      </div>
    </div>
  );
}

export default EmiCalculator;

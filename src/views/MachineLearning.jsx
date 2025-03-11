import { useState } from 'react';

function MachineLearning() {
  const [income, setIncome] = useState('');
  const [debt, setDebt] = useState('');
  const [creditHistory, setCreditHistory] = useState('');
  const [risk, setRisk] = useState(null);
  const [pendingPerson, setPendingPerson] = useState(null);
  
  // Initially, people represents expert data and risk judgement
  const [people, setPeople] = useState([
    { income: 50000, debt: 5000, creditHistory: 5, risk: 0 },
    { income: 60000, debt: 8000, creditHistory: 10, risk: 1 },
    { income: 55000, debt: 3000, creditHistory: 3, risk: 0 },
    { income: 70000, debt: 6000, creditHistory: 7, risk: 2 },
    { income: 48000, debt: 4000, creditHistory: 4, risk: 0 },
    { income: 62000, debt: 7000, creditHistory: 9, risk: 1 },
    { income: 58000, debt: 2000, creditHistory: 2, risk: 0 },
    { income: 75000, debt: 6500, creditHistory: 8, risk: 2 }
  ]);

  // Function to calculate risk level using expert data
  // NOT FOR PRODUCTION SYSTEMS. 
  const calculateRisk = (income, debt, creditHistory) => {
    let closestMatch = people[0];
    let closestDistance = Infinity;

    people.forEach(data => {
      const distance = Math.abs(data.income - income) + Math.abs(data.debt - debt) + Math.abs(data.creditHistory - creditHistory);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestMatch = data;
      }
    });

    return closestMatch.risk;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      income: parseInt(income),
      debt: parseInt(debt),
      creditHistory: parseInt(creditHistory),
      risk: calculateRisk(parseInt(income), parseInt(debt), parseInt(creditHistory)),
    };
    setPendingPerson(newPerson);
    setRisk(newPerson.risk);
  };

  const handleAcceptRisk = () => {
    setPeople([...people, pendingPerson]);
    setPendingPerson(null);
    setRisk(null);
    setIncome('');
    setDebt('');
    setCreditHistory('');
  };

  const handleDeclineRisk = () => {
    setPendingPerson(null);
    setRisk(null);
    setIncome('');
    setDebt('');
    setCreditHistory('');
  };

  return (
    <div style={{ padding: '20px' }}>
      Credit Score for new person:  
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Income"
          value={income}
          onChange={(e) => setIncome(parseInt(e.target.value))}
          required
        />
        <input
          type="number"
          placeholder="Debt"
          value={debt}
          onChange={(e) => setDebt(parseInt(e.target.value))}
          required
        />
        <input
          type="number"
          placeholder="Credit History"
          value={creditHistory}
          onChange={(e) => setCreditHistory(parseInt(e.target.value))}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {risk !== null && (
        <div>
          <h2>Risk Score: {risk}</h2>
          <button onClick={handleAcceptRisk}>Accept Risk</button>
          <button onClick={handleDeclineRisk}>Decline Risk</button>
        </div>
      )}
      <h3 style={{ marginTop: '25px' }}>Based on these data:</h3>
      <table style={{ textAlign: 'center', border: '1px solid black' }}>
        <thead>
          <tr>
            <th>Income</th>
            <th>Debt</th>
            <th>Credit History</th>
            <th>Risk score</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index}>
              <td>{person.income}</td>
              <td>{person.debt}</td>
              <td>{person.creditHistory}</td>
              <td>{person.risk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MachineLearning;

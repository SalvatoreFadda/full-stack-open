import { useState } from 'react'

const buttonStyle = {
  marginRight: '16px',
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Button = ({ onClick, text }) => {
    return <button style={buttonStyle} onClick={onClick}>{text}</button>;
  }
  
  const StatisticLine = ({ text, value }) => {
    return (
      <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    )
  }

  // do not define a component within another component
  const Statistics = ({ good, neutral, bad }) => {
    
    const getAll = () => good + neutral + bad;

    if (!getAll()) return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
        </div>
    )

    const getAverage = () => {
      const all = getAll();
      if (all === 0) return 0;
     return (good - bad) / all;
    }

    const getPositive = () => {
      const all = getAll();
      if (all === 0) return 0;
      return (good / all) * 100;
    }

    return (
      <div>
      <h3>statistics</h3>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={getAll()} />
          <StatisticLine text="average" value={getAverage().toFixed(2)} />
          <StatisticLine
            text="positive"
            value={`${getPositive().toFixed(2)}%`}
          />
        </tbody>
      </table>
    </div>
    )
  }

  const handleClick = (type) => {
    if (type === 'good') {
      setGood(good + 1);
    } else if (type === 'neutral') {
      setNeutral(neutral + 1);
    } else if (type === 'bad') {
      setBad(bad + 1);
    }
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button
        onClick={() => handleClick('good')}
        text="good"
      />
      <Button
        onClick={() => handleClick('neutral')}
        text="neutral"
      />
      <Button onClick={() => handleClick('bad')} text="bad" />
      {<Statistics good={good} neutral={neutral} bad={bad} />}
    </div>
  )
}

export default App
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [userInput, setUserInput] = useState('');
  const [generatedSQL, setGeneratedSQL] = useState('');
  const [SQLresult, setSQLresult] = useState([]);
  const [showExamples, setShowExamples] = useState(false);

  const handleInputChange = async (event) => {
    const input = event.target.value;
    setUserInput(input);

    try {
      const response = await fetch('http://localhost:5000/generate_sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: input }),
      });

      if (!response.ok) {
        const data = await response.json();
        setGeneratedSQL(data.generated_sql);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data); // 确认 data 是否正确
      console.log('data.result_sql:', data.result_sql); // 确认 data.result 是否正确
      setGeneratedSQL(data.generated_sql); // 将生成的 SQL 语句设置到 state 中
      // 将字典转换为数组
      setSQLresult(data.result_sql && Array.isArray(data.result_sql) ? data.result_sql : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleShowExamples = () => {
    setShowExamples(!showExamples);
  };

  return (
    <div className="App">
      <h1>用户输入自然语言，智能生成 SQL 语句，并返回执行结果</h1>
      <div>
        <label>
          用户输入:
          <br />
          <input type="text" value={userInput} onChange={handleInputChange} />
        </label>
      </div>
      <button onClick={toggleShowExamples}>参考示例</button>
      {showExamples && (
        <div className="examples">
          <p>Alice Johnson</p>
        </div>
      )}
      <div>
        <label>
          生成的 SQL 语句:
          <br />
          <textarea value={generatedSQL} readOnly />
        </label>
      </div>
      <div>
        <label>
          SQL 执行结果:
          {SQLresult.length > 0 ? (
            <table>
              <thead>
                <tr>
                  {Object.keys(SQLresult[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SQLresult.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, idx) => (
                      <td key={idx}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>SQL语句执行失败，请检查SQL语句是否正确生成</p>
          )}
        </label>
      </div>
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [generatedSQL, setGeneratedSQL] = useState('');

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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setGeneratedSQL(data.generated_sql);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <div>
        <label>
          用户输入:
          <input type="text" value={userInput} onChange={handleInputChange} />
        </label>
      </div>
      <div>
        <label>
          生成的 SQL 语句:
          <textarea value={generatedSQL} readOnly />
        </label>
      </div>
    </div>
  );
}

export default App;
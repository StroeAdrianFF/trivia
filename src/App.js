import React, { useState } from 'react';
import './App.css';
import Quiz from './Quiz';
import Counter from './Counter';


function App() {
  const [counter, setCounter] = useState(0)

  return (
    <div className="App">
      <Quiz counter={counter} setCounter={setCounter} />
      <Counter counter={counter} />
    </div>

  );
}

export default App;

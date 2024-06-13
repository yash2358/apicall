import logo from './logo.svg';
import './App.css';
import React from 'react';
import { increment,decrement } from './countReducer';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const count=useSelector((state)=>state.count);
  const dispatch=useDispatch();
  return (
    <div className="App">
     <h1>Counter Application</h1>
       <button onClick={()=>dispatch(increment())}>Increment</button>
       <span>{count}</span>
       <button onClick={()=>dispatch(decrement())}>Decrement</button>
    </div>
  );
}

export default App;

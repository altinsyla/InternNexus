import React from 'react';
import '../src/styles/App.css';
import NavigationBar from './components/NavigationBar';
import Students from './components/Students/Students.js';
import Home from './components/Home/Home.js';
import Login from './components/Login.js';

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <Students />
      {/* <Login /> */}
    </div>
  );
}

export default App;

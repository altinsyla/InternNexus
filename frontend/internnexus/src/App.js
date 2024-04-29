import React from 'react';
import '../src/styles/App.css';
import NavigationBar from './components/NavigationBar.js';
import Signup from './components/SignUp/Signup.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>
      {/* <Home /> */}
      {/* <Login /> */}
      <NavigationBar />
      <Signup></Signup>
      
      {/* <Students /> */}
      </body>
    </div>
  );
}

export default App;

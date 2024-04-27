import React from 'react';
import '../src/styles/App.css';
import Login from './components/Login';
import NavigationBar from './components/NavigationBar';
import Students from './components/Students';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>
      {/* <NavigationBar /> */}
      <Login />
      <NavigationBar />
      <Students />
      </body>
    </div>
  );
}

export default App;

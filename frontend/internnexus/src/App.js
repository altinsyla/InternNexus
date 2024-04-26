import React from 'react';
import '../src/styles/App.css';
import NavigationBar from './components/NavigationBar';
import Students from './components/Students';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>
      <NavigationBar />
      <Students />
      </body>
    </div>
  );
}

export default App;

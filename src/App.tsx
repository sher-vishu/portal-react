import React from 'react';
import './App.css';
import HeaderComponent from './components/header';
import Nav from './components/nav';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <HeaderComponent />
      <Nav />
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import { Router } from './routes/router';
import Header from './Header/Header';

function App() {
  return (
    <div>
      <Header />
      <Router />
    </div>
  );
}

export default App;

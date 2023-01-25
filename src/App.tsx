import { useState } from 'react';
import './App.css';
import Container from './components/Container';
import Card from './components/Card';

function App() {
  return (
    <div className="w-full h-full">
      <Container>
        <Card />
      </Container>
    </div>
  );
}

export default App;

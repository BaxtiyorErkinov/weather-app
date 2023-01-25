import { useState } from 'react';
import './App.css';
import Container from './components/Container';
import Card from './components/Card';
import Search from './components/Search/Search';

function App() {
  return (
    <div className="w-full h-full">
      <Container>
        <Search />
        <Card />
      </Container>
    </div>
  );
}

export default App;

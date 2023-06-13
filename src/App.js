import './App.css';
import Home from './components/Home'
import People from './components/People';
import Planet from './components/Planet';
import Film from './components/Film';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planet" element={<Planet />}/>
        <Route path="/people" element={<People />}/>
        <Route path="/film" element={<Film />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

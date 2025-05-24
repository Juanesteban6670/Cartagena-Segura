import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Ciudadano from './pages/Ciudadano';
import Administrador from './pages/Administrador';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/ciudadano" element={<Ciudadano />} />
        <Route path="/admin" element={<Administrador />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

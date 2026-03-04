import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./paginas/Login";
import Cadastro from "./paginas/Cadastro";
import Dashboard from "./paginas/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
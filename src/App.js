import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Table from './components/Table';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/tabela-miasta" element={<Table />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

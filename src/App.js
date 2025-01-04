import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Crud from './views/crud/Crud';
import Home from './views/Home';
import Navbar from './components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import Categories from './views/categories/Categories';

function App() {
  return (    
    <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/crud' element={<Crud />} />
          <Route path='/categories' element={<Categories />} />
        </Routes>
      </Router>    
  )
}

export default App;

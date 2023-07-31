import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom"
import Home from './views/Home/Home';
import Navbar from "./components/Navbar/Navbar"
import CreateProduct from './components/CreateProduct/CreateProduct';
import Contact from './views/Contact/Contact'
import About from './views/About/About';

function App() {

  /* 
  const location = useLocation();
  const navigate = useNavigate(); */

  return (
    <div>

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/createProduct' element={<CreateProduct />} />
      </Routes>

    </div>
  )
}

export default App

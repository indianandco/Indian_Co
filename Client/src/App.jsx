import './App.css'
import { Routes, Route } from "react-router-dom"
import Landing from './views/Landing/Landing'
import Home from './views/Home/Home';
import Navbar from "./components/Navbar/Navbar"

function App() {

  /* 
  const location = useLocation();
  const navigate = useNavigate(); */

  return (
    <div>

      <Navbar />

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
      </Routes>

    </div>
  )
}

export default App
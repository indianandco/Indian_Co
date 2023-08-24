import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useLocation } from "react-router-dom"
import Home from './views/Home/Home';
import Navbar from "./components/Navbar/Navbar"
import Contact from './views/Contact/Contact'
import About from './views/About/About';
import Detail from './views/Detail/Detail';
import Container from './views/Products/Container/Container';
import NotFound from './views/Error/NotFound';
import DashboardAdmin from './views/DashboardAdmin/DashboardAdmin'
import Cart from './views/Cart/Cart'
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from 'react';


function App() {


  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('role'));

  useEffect(() => {
    const role = sessionStorage.getItem('role')
    setIsAdmin(role)
  }, [isAdmin])

  return (
    <>

      {location.pathname !== ("/*" && "/dashboardadmin") && < Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        {isAdmin === 'admin' && (
          <Route path='/dashboardadmin' element={<DashboardAdmin />} />
        )}

        <Route path='/products' element={<Container />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>

      {location.pathname !== "/dashboardadmin" && <Footer />}

    </>
  )
}

export default App

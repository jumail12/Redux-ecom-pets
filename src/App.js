import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './components/login/Register';
import Login from './components/login/Login';
import CatAll from './components/Cat/CatAll';
import DogAll from './components/Dog/DogAll';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import DogLayout from './pages/DogLayout';
import DogFood from './components/Dog/DogFood';
import DogBed from './components/Dog/DogBed';
import CatLayout from './pages/CatLayout';
import CatFood from './components/Cat/CatFood';
import CatTreat from './components/Cat/CatTreat';
import Best from './components/Best';
import ProD from './components/Details/ProD';
import Cart from './pages/Cart';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from './sliceLogic/ProductSlice';
import { fetchCart } from './sliceLogic/cartSlice';
import TopPro from './components/TopPro/TopPro';
import Payment from './pages/Payment';
import ThankYou from './pages/ThankYou';
import Profile from './components/Profile';
// import PetAdoption from './components/PetAdoption';

const LOCAL_STORAGE_ID_KEY = "id";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
       dispatch(fetchCart());
      dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/store' element={<Best />} />
        {/* <Route path='/adopt' element={<PetAdoption />} /> */}

        <Route path="/profile" element={<Profile />} />

        <Route path='/dog' element={<DogLayout />}>
          <Route index element={<DogFood />} /> 
          <Route path='dfood' element={<DogFood />} /> 
          <Route path='dbeds' element={<DogBed />} /> 
        </Route>

        <Route path='/cat' element={<CatLayout />}>
          <Route index element={<CatFood />} /> 
          <Route path='cfood' element={<CatFood />} /> 
          <Route path='ctreat' element={<CatTreat />} /> 
        </Route>
        <Route path='/store' element={<TopPro/>}/>

        <Route path='/prod/:id' element={<ProD />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/thankyou' element={<ThankYou/>}/>
       </Routes>
      <Footer />
    </div>
  );
}

export default App;


import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './components/login/Register';
import Login from './components/login/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import DogLayout from './pages/DogLayout';
import DogFood from './components/Dog/DogFood';
import DogBed from './components/Dog/DogBed';
import CatLayout from './pages/CatLayout';
import CatFood from './components/Cat/CatFood';
import CatTreat from './components/Cat/CatTreat';
import Best from './components/Best';

import Cart from './pages/Cart';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { fetchProducts } from './sliceLogic/ProductSlice';
import { fetchCart } from './sliceLogic/cartSlice';
// import TopPro from './components/TopPro/TopPro';
import Payment from './pages/Payment';
import ThankYou from './pages/ThankYou';
import Profile from './components/Profile';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import PDetails from './components/Details/PDetails';
import WishList from './components/WishList ';
import TopPro from './components/TopPro/TopPro';






function App() {
  const dispatch = useDispatch();

  useEffect(() => {
       dispatch(fetchCart());
      // dispatch(fetchProducts());
  }, [dispatch]);

  const location=useLocation();
  const sholudHidden=location.pathname==="/login"||location.pathname==="/register" || location.pathname.startsWith("/admin") 

  return (
    <div>
      
      {!sholudHidden&&<Navbar/>}
      <ToastContainer/>
     
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/store' element={<Best />} />
        {/* <Route path='/adopt' element={<PetAdoption />} /> */}

        <Route path="/profile" element={<Profile />} />

        <Route path='/dog' element={<DogLayout />}>
          <Route index element={<DogFood />} /> 
          <Route path='dog-food' element={<DogFood />} /> 
          <Route path='dog-beds' element={<DogBed />} /> 
        </Route>

        <Route path='/cat' element={<CatLayout />}>
          <Route index element={<CatFood />} /> 
          <Route path='cat-food' element={<CatFood />} /> 
          <Route path='cat-treat' element={<CatTreat />} /> 
        </Route>
        <Route path='/go' element={<TopPro/>}/>

        <Route path='/wishlist' element={<WishList/>}/>

        <Route path='/product/:idd' element={<PDetails/>}/>
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/thankyou' element={<ThankYou/>}/>
       </Routes>

      
       {!sholudHidden&&<Footer/>}
    </div>
  );
}

export default App;

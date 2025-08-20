import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Homepage from './Components/Homepage/Homepage';
import Footer from './Components/Footer/Footer';
import { ThemeProvider } from './Contexts/ThemeContext';
import ProductPage from './Components/ProductPage/ProductPage';
import Dashboard from './Components/Dashboard/Dashboard';
import LoginPage from './Components/LoginPage/LoginPage';
import ScrollToTop from './Contexts/Scrolltop';
import Cartpage from './Components/CartPage/Cartpage';
import { CurrencyExchange } from './Contexts/CurrencyExchange';
import ProtectedRoute from './Contexts/ProtectedRoute';
import ItemPage from './Components/ItemPage/ItemPage';
import Category from './Components/Categorypage/Category';

const stripePromise = loadStripe('pk_test_51RyAWTIkUBOokg8wAGt4eF4F8evdPjUZimzCoX4jQTRWvKAl56gMWNnnlT0aIbnyfTb5WU8AvIEkYV3ObCg3PGmq00Oxgp3YDb'); // Replace with your Stripe publishable key

const App = () => {
  return (
    <ThemeProvider>
      <CurrencyExchange>
        <Elements stripe={stripePromise}>
          <Router>
            <ScrollToTop />
            <Navbar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/Homepage" element={<Homepage />} />
              <Route path="/Product/:type" element={<ProductPage />} />
              <Route path="/Dashboard"element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
              <Route path="/Login" element={<LoginPage/>} />
              <Route path="/Cartpage" element={<Cartpage/>} />
              <Route path="/item/:type/:id" element={<ItemPage />} />
              <Route path='/Category' element={<Category/>}/>
              <Route path='/Category/:gender' element={<Category/>}/>
              <Route path='/Category/:gender/:type' element={<Category/>}/>
            </Routes>
            <Footer />
          </Router>
        </Elements>
      </CurrencyExchange>
    </ThemeProvider>
    
  );
};

export default App;
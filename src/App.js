import './App.css';
import React from 'react';
// import { ItemsProvider } from './allMeat/allMeat';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Title from './Components/Home/Title/Title';
import MainContent from './Components/Home/MainContent/MainContent';
import Feedback from './Components/Home/Feedback/Feedback';
import Footer from './Components/Footer/Footer';
import ItemPage from './Components/Catalog/ItemPage/ItemPage';
import CatalogPage from './Components/Catalog/CatalogPage/CatalogPage';
import ContactPage from './Components/Contact/ContactPage/ContactPage';
import CartPage from './Components/CartPage/CartPage';
import PurchaseValidationPage from './Components/Purchase/PurchaseValidationPage/PurchaseValidationPage';
import SuccessPage from './Components/Purchase/SuccessPage/SuccessPage';

function App() {
  return (
    <div className="App">
      {/* <ItemsProvider> */}
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Title />
                <MainContent />
                <Feedback />
              </>
            }
          />
          <Route path="/catalog" element={<CatalogPage/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/item/:id" element={<ItemPage/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/purchase" element={<PurchaseValidationPage/>} />
          <Route path="/success" element={<SuccessPage/>} />
        </Routes>

      {/* </ItemsProvider> */}
      <Footer />
    </div>
  );
}


export default App;

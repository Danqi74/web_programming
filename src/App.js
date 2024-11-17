import './App.css';
import React from 'react';
import { ItemsProvider } from './allMeat/allMeat';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Title from './Components/Home/Title/Title';
import MainContent from './Components/Home/MainContent/MainContent';
import Feedback from './Components/Home/Feedback/Feedback';
import Footer from './Components/Footer/Footer';
import ItemPage from './Components/Catalog/ItemPage/ItemPage';
import CatalogPage from './Components/Catalog/CatalogPage/CatalogPage';
import ContactPage from './Components/Contact/ContactPage/ContactPage';

function App() {
  return (
    <div className="App">
      <ItemsProvider>
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
          <Route path="item/:id" element={<ItemPage/>} />
        </Routes>

      </ItemsProvider>
      <Footer />
    </div>
  );
}


export default App;

import './App.css';
import {React} from 'react';
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
import LoginPage from './Components/Login/LoginPage/LoginPage';
import RegisterPage from './Components/Login/RegisterPage/RegisterPage';
import { PrivateRoute } from './route/private';

function App() {
  const add_header_and_footer = (element) =>{
    return(
      <>
        <Header/>
        {element}
        <Footer/>
      </>
    )
  };
  return (
    <div className="App">
      {/* <ItemsProvider> */}
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route
            path="/"
            element={<PrivateRoute
              component={add_header_and_footer(
              <>
                <Title />
                <MainContent />
                <Feedback />
              </>
            )}/>}
          />
          <Route path="/catalog" element={<PrivateRoute component={add_header_and_footer(<CatalogPage/>)}/>} />
          <Route path="/contact" element={<PrivateRoute component={add_header_and_footer(<ContactPage/>)}/>} />
          <Route path="/item/:id" element={<PrivateRoute component={add_header_and_footer(<ItemPage/>)}/>} />
          <Route path="/cart" element={<PrivateRoute component={add_header_and_footer(<CartPage/>)}/>} />
          <Route path="/purchase" element={<PrivateRoute component={add_header_and_footer(<PurchaseValidationPage/>)}/>} />
          <Route path="/success" element={<PrivateRoute component={add_header_and_footer(<SuccessPage/>)}/>} />
        </Routes>
      {/* </ItemsProvider> */}
    </div>
  );
}

export default App;

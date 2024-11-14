import './App.css';
import React from 'react' 
import Header from './Components/Header/Header';
import Title from './Components/Title/Title';
import MainContent from './Components/MainContent/MainContent';
import Feedback from './Components/Feedback/Feedback';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Title/>
      <MainContent/>
      <Feedback/>
      <Footer/>
    </div>
  );
}


export default App;

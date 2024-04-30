import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Main from './components/Main';
import LoginScreen from './components/Login';
import Register from './components/Register';
import Principal from './components/Principal';
import Criterios from './components/CriteriaRating';
import Modelos from './components/Modelos';
import Decision from './components/Decision';
import Alternativas from './components/Alternativas';
import Pruebas from './components/pruebas';
import { useLogin } from './contexts/useLogin';

function App() {

  const {user, isLogged} = useLogin()
  console.log(user)
  
  return (
    <Router>
    <Routes>
      {isLogged && (
        <>
          <Route path="/" element={<Main />} />
          <Route path="/principal" element={<Principal />} />
          <Route path="/criterios" element={<Criterios />} />
          <Route path="/modelos" element={<Modelos />} />
          <Route path="/decision" element={<Decision />} />
          <Route path="/alternativas" element={<Alternativas />} />
        </>
      )}
      {
        !isLogged && (
          <>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pruebas" element={<Pruebas />} />
          </>
        )
      }
    </Routes>
  </Router>
  
 );
}

export default App;

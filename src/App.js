import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import './AppThemeLight.css';
import Home from './components/home/Home';
import { AppContext } from './AppContextProvider';


function App() {

  const context = useContext(AppContext);
  return (

    <div className={"App " + context.appTheme}>
      <Home/>
    </div>
  );
}

export default App;

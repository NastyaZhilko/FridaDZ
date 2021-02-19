import React, {useEffect} from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Routes from "./components/routes/Routes";
import Header from "./components/header/Header";
import {useDispatch} from "react-redux";
import 'rc-slider/assets/index.css';
import {getPacksTC} from "./store/packs-reducer";




const App = () => {



    return (
        <div className="App">
            <HashRouter>
                    <Header/>
                    <Routes/>

            </HashRouter>
        </div>
    );
}

export default App;

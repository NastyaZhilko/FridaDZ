import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Routes from "./components/routes/Routes";
import Header from "./components/header/Header";
import {Provider} from "react-redux";
import store from "./store/store";

const App = () => {
    return (
        <div className="App">
            <HashRouter>
                <Provider store={store}>
                    <Header/>
                    <Routes/>
                </Provider>
            </HashRouter>
        </div>
    );
}

export default App;

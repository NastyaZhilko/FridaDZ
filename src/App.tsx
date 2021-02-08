import React, {useEffect} from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Routes from "./components/routes/Routes";
import Header from "./components/header/Header";
import {Provider} from "react-redux";
import store from "./store/store";
import axios from "axios";




const App = () => {
    const instance = axios.create({
        baseURL:'http://localhost:7542/2.0/',
      //  withCredentials:true,
    })
    const obj = {
        email: "nya-1admin1@gmail.com",
        password: "1qazxcvBG"
    }
    useEffect(()=>{
        instance.post("auth/register",
            obj).then((data)=>console.log(data))
            .catch((error)=>console.log(error))
            .finally(()=>{
            console.log("finally")
        })
    },[])
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

import React, {useEffect} from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Routes from "./components/routes/Routes";
import Header from "./components/header/Header";
import {Provider} from "react-redux";
import store from "./store/store";
import axios from "axios";
import {registrationAC} from "./store/registration-reducer";




const App = () => {
    // const instance = axios.create({
    //     baseURL:'http://localhost:7542/2.0/',
    //     withCredentials:true,
    // })
    // const obj = {
    //     email: "nya-1171admin11@gmail.com",
    //     password: "1qazxcvBG"
    // }
    // useEffect(()=>{
    //     axios.post("http://localhost:7542/2.0/auth/register", obj)
    //         .then((data) => {
    //             console.log(data)
    //         })
    // },[])

    // useEffect(()=> {
    //         instance.post("auth/register", obj)
    //             .then((data) => console.log(data))
    //             .catch((error)=>{
    //                 console.log('Error')
    //             })
    //             .finally(()=>console.log('finally'))
    //     }
    //         // .finally(()=>{
    //         // console.log("finally")
    //     //})
    // ,[])
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

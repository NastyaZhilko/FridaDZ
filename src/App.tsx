import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Routes from "./components/routes/Routes";
import Header from "./components/header/Header";
import {Provider} from "react-redux";
import store from "./store/store";
import SuperInputText from "./components/common/SuperInput/SuperInput";

const App = () => {
    const foo = (e:string) =>{
        console.log(e)
    }
    const foo1 = ()=> {
        console.log(159)
    }
    return (
        <div className="App">
            <HashRouter>
                <Provider store={store}>
                    <Header/>
                    <Routes/>
                </Provider>
                <SuperInputText onChangeText={foo} onEnter={foo1} error={'Error'} type={'radio'} className={'titleColor'}/>
            </HashRouter>
        </div>
    );
}

export default App;

import React, {useEffect, useState} from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Routes from "./components/routes/Routes";
import Header from "./components/header/Header";
import {Provider, useDispatch, useSelector} from "react-redux";
import store from "./store/store";
import axios from "axios";
import {registrationAC} from "./store/registration-reducer";
import {RangeComponent} from "./components/common/RangeComponent/RangeComponent";
import {SearchComponent} from "./components/common/SearchComponent/SearchComponent";
import {PaginationComponent} from "./components/common/PaginationComponent/PaginationComponent";
//import {cardPacksAPI, packsAPI} from "./api/api";
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import RangeSlider from "./components/common/PaginationComponent/RangeMaterialUi/RangeMaterialUa";
import {SliderAnt} from "./components/common/PaginationComponent/RangeAnt/RangeAnt";
import Packs from "./components/pages/Packs";
import {getPacksTC} from "./store/cards-reducer";
import {SortByDate} from "./components/common/SortByDate/SortByDate";



const App = () => {
    // const initValueOption = 10
    // const options = [10, 20, 30, 40, 50]
    // const [range, setRange] = useState([2,8])
    // const [cards, setCards] = useState([{}])
    // useEffect(()=>{
    //     cardPacksAPI.getCardPacks(10,15).then((data)=>{
    //         setRange([data.data.minCardsCount, data.data.maxCardsCount])
    //         console.log(data.data.cardPacks)
    //         //setCards(data.data.cardPacks)
    //        })
    // }, [])
    // console.log(range)


    // const dispatch = useDispatch()
    // useEffect(()=>{
    //     dispatch(cardsTC())
    // },[])

    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getPacksTC())

        // const api = axios.create({
        //     baseURL: 'https://neko-back.herokuapp.com/2.0',
        //     //baseURL: 'http://localhost:7542/2.0/',
        //     withCredentials: true
        // })
        // api.get('/cards/card/', {
        //     params:{
        //         cardsPack_id: "602e719b1e1cc30e0082d02f"
        //     }
        // }).then(data=>{
        //     debugger
        // })

    },[])


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

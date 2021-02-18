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
import {cardPacksAPI, packsAPI} from "./api/api";
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import RangeSlider from "./components/common/PaginationComponent/RangeMaterialUi/RangeMaterialUa";
import {SliderAnt} from "./components/common/PaginationComponent/RangeAnt/RangeAnt";
import Cards from "./components/pages/Cards";
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

    },[])


    return (
        <div className="App">
            <HashRouter>

                    <Header/>
                    <Routes/>

            </HashRouter>
            {/*<RangeSlider/>*/}
            {/*<SliderAnt />*/}
            {/*<Range  min={range[0]} max={range[1]} defaultValue={[range[0],range[1]]}/>*/}
            {/*<Range  min={1} max={100} defaultValue={[2,8]}/>*/}
            {/*<SearchComponent cards={cards}/>*/}
            {/*<PaginationComponent  initValueOption={initValueOption} options={options}/>*/}

            {/*<Cards/>*/}


        </div>
    );
}

export default App;

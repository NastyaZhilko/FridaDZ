import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
//import {cardsTC} from "../../store/cards-reducer";
import {PaginationComponent} from "../common/PaginationComponent/PaginationComponent";
import {SearchComponent} from "../common/SearchComponent/SearchComponent";
import {SortByDate} from "../common/SortByDate/SortByDate";
import {SliderAnt} from "../common/PaginationComponent/RangeAnt/RangeAnt";

function Packs(){
    //const initValueOption = 10
    const options = [10, 20, 30, 40, 50]
    const cards = useSelector<any, any>((state)=>state.cards.newCards)



    return(
        <div>
            <SliderAnt/>
            <SortByDate/>
            <SearchComponent cards={cards}/>
            {cards.map((card:any, index:number)=>{

                return <div key={index}>{`${card.name} ${card.cardsCount}`}</div>
            })}
            <PaginationComponent  options={options}/>

        </div>
    )
}
export default Packs


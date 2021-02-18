import React from 'react';
import {useSelector} from "react-redux";
import {PaginationComponent} from "../common/PaginationComponent/PaginationComponent";
import {SearchComponent} from "../common/SearchComponent/SearchComponent";
import {SortByDate} from "../common/SortByDate/SortByDate";
import {SliderAnt} from "../common/PaginationComponent/RangeAnt/RangeAnt";
import {Cards} from "./cards";


function Packs(){
    const options = [10, 20, 30, 40, 50]
    const packs = useSelector<any, any>((state)=>state.cards.packs)

    return(
        <div>
            <SliderAnt/>
            <SortByDate/>
            <SearchComponent/>
            {packs.map((pack:any, index:number)=>{
                return <div style={{display:'flex', justifyContent:'center'}}>
                    <div key={index}>{`${pack.name} ---- ${pack.cardsCount}----`}</div>
                    <Cards packId={pack._id}/>
                </div>
            })}
            <PaginationComponent  options={options}/>

        </div>
    )
}
export default Packs
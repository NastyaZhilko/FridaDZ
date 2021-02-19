import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {PaginationComponent} from "../common/PaginationComponent/PaginationComponent";
import {SearchComponent} from "../common/SearchComponent/SearchComponent";
import {SortByDate} from "../common/SortByDate/SortByDate";
import {SliderAnt} from "../common/PaginationComponent/RangeAnt/RangeAnt";
import {Cards} from "./Cards";
import {deletePackTC, getPacksTC, updatePackTC} from "../../store/packs-reducer";



function Packs(){
    const options = [10, 20, 30, 40, 50]
    const packs = useSelector<any, any>((state)=>state.cards.packs)
    const dispatch = useDispatch()
    const deletePack = (id: string) => dispatch(deletePackTC(id))
    const updatePack = (id: string, newTitle: string) => dispatch(updatePackTC(id, newTitle))

    useEffect(()=>{
        dispatch(getPacksTC())

    },[])

    return(
        <div>
            <h1>Packs</h1>
            <SliderAnt/>
            <SortByDate/>
            <SearchComponent/>
            <div style={{display:'flex', justifyContent:'center'}}>
            <div>Name</div>
            <div>CardsCount</div>
            <div>Update</div>
            <button>Add</button>

            <div>Cards</div>
            </div>
            {packs.map((pack:any, index:number)=>{
                return <div style={{display:'flex', justifyContent:'center'}}>
                    <div key={index}>{`${pack.name} ---- ${pack.cardsCount}----${pack.updated}-----`}</div>
                    <div>
                        <button name={"del"} >Delete</button>
                    </div>
                    <div>
                        <button name={"update"} >Update</button>
                    </div>

                    <Cards packId={pack._id}/>
                </div>
            })}
            <PaginationComponent  options={options}/>

        </div>
    )
}
export default Packs

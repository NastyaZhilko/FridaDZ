import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {PaginationComponent} from "../common/PaginationComponent/PaginationComponent";
import {SearchComponent} from "../common/SearchComponent/SearchComponent";
import {SortByDate} from "../common/SortByDate/SortByDate";
import {SliderAnt} from "../common/PaginationComponent/RangeAnt/RangeAnt";
import {createPackTC, getPacksTC} from "../../store/packs-reducer";
import Pack from "./pack";
import {AppStoreType} from "../../store/store";
import {CardPacksType} from "../../api/api";


function Packs() {
    const options = [10, 20, 30, 40, 50]
    const packs = useSelector<AppStoreType, Array<CardPacksType>>((state) => state.cards.packs)
    const dispatch = useDispatch()

    const createPack = () => dispatch(createPackTC())

    useEffect(() => {
        dispatch(getPacksTC())

    }, [])

    return (
        <div>
            <h1>Packs</h1>
            <SliderAnt/>
            <SortByDate/>
            <SearchComponent/>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>

                <div>Name</div>
                <div>CardsCount</div>
                <div>Update</div>
                <label>Create new pack: <button onClick={createPack}>Add</button></label>
                <div>Cards</div>
            </div>

            {packs.map((packs: CardPacksType) =>
                <Pack pack_id={packs._id}
                      userId={packs.user_id}/>
            )}
            <PaginationComponent options={options}/>

        </div>
    )
}

export default Packs

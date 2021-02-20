import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Cards} from "./Cards";
import {deletePackTC} from "../../store/packs-reducer";
import {CardPacksType} from "../../api/api";
import {AppStoreType} from "../../store/store";

type PropsType = {
    /*name: string
    cardsCount?: number
    updated?: string*/
    pack_id: string
    userId: string
}
export const Pack = (props: PropsType) => {

    const packs = useSelector<AppStoreType, Array<CardPacksType>>((state) => state.cards.packs)
    const dispatch = useDispatch()


    const deletePack = () => dispatch(deletePackTC(props.pack_id))
    // const updatePack = () => dispatch(updatePackTC(props.pack_id))


    return (
        <div>
            {packs.map((pack: CardPacksType, index: number) => {
                return <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div key={index}>{`${pack.name} ---- ${pack.cardsCount}----${pack.updated}-----`}</div>
                    <div>
                        <button name={"del"} onClick={deletePack}>Delete</button>
                    </div>
                    <div>
                        <button name={"update"}>Update</button>
                    </div>

                    <Cards packId={pack._id}/>
                </div>
            })}

        </div>


    )
}
export default Pack
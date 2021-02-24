import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Cards} from "./Cards";
import {deletePackTC} from "../../store/packs-reducer";
import {CardPacksType} from "../../api/api";
import {AppStoreType} from "../../store/store";
import { Learn } from './Learn';

type PropsType = {
    name: string
    cardsCount?: number
    updated?: string
    pack_id: string
    userId: string
}
export const Pack = (props: PropsType) => {

    const dispatch = useDispatch()


    const deletePack = () => dispatch(deletePackTC(props.pack_id))
    // const updatePack = () => dispatch(updatePackTC(props.pack_id))

    return (
        <div>

            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <div>{`${props.name} ---- ${props.cardsCount}----${props.updated}-----`}</div>
                <div>
                    <button name={"del"} onClick={deletePack}>Delete</button>
                </div>
                <div>
                    <button name={"update"}>Update</button>
                </div>

                <Cards packId={props.pack_id}/>
                <Learn packId={props.pack_id}/>
            </div>


        </div>


    )
}
export default Pack
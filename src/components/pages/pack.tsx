import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createPackTC, deletePackTC, IsLoadingValuesType} from "../../store/packs-reducer";
import {CardPacksType} from "../../api/api";
import {AppStoreType} from "../../store/store";
import {NavLink} from "react-router-dom";

type PropsType = {
    name: string
    cardsCount?: number
    updated?: string
    pack_id: string
    userId: string

}
export const Pack = (props: PropsType) => {
    const status = useSelector<AppStoreType, IsLoadingValuesType>(state => state.cards.status)
    const packs = useSelector<AppStoreType, Array<CardPacksType>>((state) => state.cards.packs)
    const dispatch = useDispatch()

    const createPack = () => dispatch(createPackTC())
    const deletePack = () => dispatch(deletePackTC(props.pack_id))
    // const updatePack = () => dispatch(updatePackTC(props.pack_id))


    return (
        <div>

          {/*  <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <div>{`${props.name} ---- ${props.cardsCount}----${props.updated}-----`}</div>
                <div>
                    <button name={"del"} disabled={status === 'loading'} onClick={deletePack}>Delete</button>
                </div>
                <div>
                    <button name={"update"} disabled={status === 'loading'}>Update</button>
                </div>

                <NavLink to={`/packs/${props.pack_id}`}>Cards</NavLink>
            </div>*/}

            <table >
                <thead>
                <tr>
                    <th>Name</th>
                    <th>CardsCount</th>
                    <th>Update</th>
                    <th><label>Add pack: <button onClick={createPack} disabled={status==='loading'}>Add</button></label></th>
                    <th>Cards</th>
                </tr>
                </thead>
                <tbody>
                {packs.map((pack:any, index:number)=>
                <tr key={index}>
                    <td>{`${props.name}`}</td>
                    <td>{`${props.cardsCount}`}</td>
                    <td>{`${props.updated}`}</td>
                    <td><button name={"del"} disabled={status === 'loading'} onClick={deletePack}>Delete</button></td>
                    <td><button name={"update"} disabled={status === 'loading'}>Update</button></td>
                    <td><NavLink to={`/packs/${props.pack_id}`}>Cards</NavLink></td>
                </tr>
                )}
                    </tbody>
            </table>
        </div>


    )

}
export default Pack
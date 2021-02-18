import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../store/store";
import style from "./cards.module.css";
import {CardPacksType} from "../../api/api";
import {NavLink} from "react-router-dom";
import {PATH} from "../routes/Routes";

type PropsType = {
    name: string
    cardsCount?: number
    updated?: string
    pack_id: string
    userId: string
}

export const Pack = (props:PropsType) => {
    const packs = useSelector<AppStoreType, Array<CardPacksType>>(state => state.packs.cardPacks)
    const dispatch = useDispatch()

    //const deletePack = () => dispatch(deletePackTC(props.pack_id))

    return (
        <div className={style.container}>

            {packs.map(packs =>
                <div className={style.table} key={props.pack_id}>
                    <div className={style.name}>{props.name}</div>
                    <div className={style.cardsCount}>{props.cardsCount}</div>
                    <div className={style.updated}>{props.updated}</div>
                    <div>
                        <button name={"del"} >Delete</button>
                    </div>
                    <div>
                        <button name={"update"}>Update</button>
                    </div>
                    <NavLink to={`${PATH.cards}/${props.pack_id}`} activeClassName={style.activeLink}>CARDS</NavLink>
                </div>
            )}
        </div>
    )
}

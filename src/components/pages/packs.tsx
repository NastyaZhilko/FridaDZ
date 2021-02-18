import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deletePackTC, getCardPacksTC} from "../../store/packs-reducer";
import {AppStoreType} from "../../store/store";
import style from "./cards.module.css";
import {CardPacksType} from "../../api/api";
import {NavLink} from "react-router-dom";
import {PATH} from "../routes/Routes";
import {Pack} from "./pack";


export const Packs = () => {
    const packs = useSelector<AppStoreType, Array<CardPacksType>>(state => state.packs.cardPacks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCardPacksTC())
    }, [dispatch])


    return (
        <div className={style.container}>
            <h1>Packs</h1>
            <div className={style.table}>

                <div className={style.name}>Name</div>
                <div className={style.cardsCount}>CardsCount</div>
                <div className={style.name}>Update</div>
                <button>Add</button>
                <div className={style.name}>Cards</div>
            </div>
            {packs.map(packs =>
                <Pack name={packs.name} cardsCount={packs.cardsCount} updated={packs.updated} pack_id={packs._id}
                      userId={packs.user_id}/>
            )}
        </div>
    )
}

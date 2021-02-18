import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import style from "./cards.module.css";
import {AppStoreType} from "../../store/store";
import {CardType} from "../../api/api";
import {getCardsTC} from "../../store/cards-reducer";
import {Card} from "./card";
import { useParams } from "react-router-dom";

export const Cards = () => {

    const cards = useSelector<AppStoreType, CardType[]>(state => state.cards.cards)
    const dispatch = useDispatch()
    const {token} = useParams<{ token: string }>()
    useEffect(() => {
        if (token) {
            dispatch(getCardsTC(token))
        }
    }, [])

    return (

        <div className={style.container}>

            <h1>Cards</h1>
            <div className={style.table}>

                <div>Question</div>
                <div>Answer</div>
                <div>Grade</div>
                <div>Updated</div>
                <div>Url</div>
                <button >Add</button>

            </div>

            {cards.map(card =>
                <Card card={card}/>
            )}
        </div>



    )
}
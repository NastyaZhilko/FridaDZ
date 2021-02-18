import React from "react";
import {useDispatch, useSelector} from "react-redux";
import style from "./cards.module.css";
import {AppStoreType} from "../../store/store";
import {CardType} from "../../api/api";
import {getCardsTC} from "../../store/cards-reducer";
type PropsType={
    card: CardType
}
export const Card = (props:PropsType) => {

    const cards = useSelector<AppStoreType, CardType[]>(state => state.cards.cards)
    const dispatch = useDispatch()
    /*    useEffect(() => {
            dispatch(getCardPacksTC())
        }, [])*/

    return (

        <div>

                <div className={style.tableString} key={props.card._id}>
                  <div>{props.card.question}</div>
                    <div>{props.card.answer}</div>
                    <div>{props.card.grade}</div>
                    <div>{props.card.updated}</div>

                </div>


        </div>

    )
}
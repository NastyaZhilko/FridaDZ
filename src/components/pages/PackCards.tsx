import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createCardTC, deleteCardTC, getCardsTC, updateCardTC} from "../../store/packCards-reducer";
import {IsLoadingValuesType} from "../../store/packs-reducer";
import style from "./packs.module.css";
import {AppStoreType} from "../../store/store";
import {CardType} from "../../api/api";


export function PackCards() {
    const {packId} = useParams<{ packId: string }>();
    const dispatch = useDispatch()
    const cards = useSelector<any, any>(state => state.packCards.cards)
    const status = useSelector<AppStoreType, IsLoadingValuesType>(state => state.cards.status)
    useEffect(() => {
        dispatch(getCardsTC(packId))
    }, [dispatch])
    const createCard = (id: string) => dispatch(createCardTC(id))
    const deleteCard = (card_id: string) => dispatch(deleteCardTC(card_id, packId))
    const updateCard = (card_id: string) => dispatch(updateCardTC(card_id, packId))
    return (
        <div>
            <h1>Cards</h1>
            <div className={style.table}>
                <table>
                    <div className={`${style.tableItem} ${style.tableHeader}`}>
                        <thead>
                        <tr>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Grade</th>
                            <th>Updated</th>
                            <th><label>Add item: <button disabled={status === 'loading'}
                                                         onClick={() => createCard(packId)}>Add</button>
                            </label></th>
                        </tr>
                        </thead>
                    </div>
                    <div className={style.tableItem}>
                        <tbody>
                        {cards.map((card: CardType) => {
                            return <tr key={card._id}>
                                <td>{`${card.question}`} </td>
                                <td>{`${card.answer}`}</td>
                                <td>{`${card.grade}`}</td>
                                <td>{`${card.updated}`}</td>
                                <td>
                                    <div className={style.tableItem}>
                                        <button name={"del"} disabled={status === 'loading'}
                                                onClick={() => deleteCard(card._id)}>
                                            Delete
                                        </button>
                                        <button name={"update"} disabled={status === 'loading'}
                                                onClick={() => updateCard(card._id)}>Update</button>
                                    </div>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </div>
                </table>
            </div>
        </div>
    )
}
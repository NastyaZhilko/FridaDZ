import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {packCardsTC} from "../../store/packCards-reducer";
import {IsLoadingValuesType} from "../../store/packs-reducer";
import style from "./packs.module.css";
import {AppStoreType} from "../../store/store";

export function PackCards() {
    const {packId} = useParams<{ packId: string }>();
    const dispatch = useDispatch()
    const cards = useSelector<any, any>(state => state.packCards.cards)
    const status = useSelector<AppStoreType, IsLoadingValuesType>(state => state.cards.status)
    useEffect(() => {
        dispatch(packCardsTC(packId))
    }, [])
    // const createPack = () => dispatch(createPackTC())//для карточки сделать
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
                            <th><label>Add item: <button disabled={status === 'loading'}>Add</button>
                            </label></th>
                        </tr>
                        </thead>
                    </div>
                    <div className={style.tableItem}>
                        <tbody>
                        {cards.map((card: any) => {
                            return <tr>
                                <td>{`${card.question}`} </td>
                                <td>{`${card.answer}`}</td>
                                <td>{`${card.grade}`}</td>
                                <td>{`${card.updated}`}</td>
                                <td>
                                    <div className={style.tableItem}>
                                        <button name={"del"} disabled={status === 'loading'}>Delete
                                        </button>
                                        <button name={"update"} disabled={status === 'loading'}>Update</button>
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
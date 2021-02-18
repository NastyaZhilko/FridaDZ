import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {packCardsTC} from "../../store/packCards-reducer";

export function PackCards(){
    const {packId} = useParams<{ packId: string }>();
    const dispatch = useDispatch()
    const cards = useSelector<any, any>(state=>state.packCards.cards)
    useEffect(()=>{
        dispatch(packCardsTC(packId))
    },[])
    return(
        <div>
            {cards.map((card:any)=>{
                return (<div>
                    {`${card.question}----${card.answer}---${card.updated}`}
                </div>)
            })}
        </div>
    )
}
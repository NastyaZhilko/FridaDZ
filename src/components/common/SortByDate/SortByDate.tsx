import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {sortByDateUpDown, sortByDateUpTC} from "../../../store/packs-reducer";

export function SortByDate(){
    const dispatch = useDispatch()
    const pageCount = useSelector<any,any>(state=>state.cards.pageCount)
    const page = useSelector<any, any>(state => state.cards.page)
    const min = useSelector<any, any>(state => state.cards.minCardsCount)
    const max = useSelector<any, any>(state => state.cards.maxCardsCount)
    const sortPacks = useSelector<any, any>(state => state.cards.sortPacks)
    function upDate(){
        dispatch(sortByDateUpTC(page, pageCount, '0created', min, max))
    }
    function downDate(){
        dispatch(sortByDateUpDown(page, pageCount, '1created', min, max))
    }
    const buttonColor = (sortPacks === '0created')? 'blue': undefined

    const buttonStyle1 = {
        width:'30px',
        backgroundColor:'blue'
    }
    const buttonStyle2 = {
        width:'30px',
        backgroundColor:'white'
    }

    return(
        <div>
            <div>
            <button style={(sortPacks === '0created')? buttonStyle1: buttonStyle2} onClick={upDate}>+</button>
            </div>
            <div>
            <button style={(sortPacks === '1created')? buttonStyle1: buttonStyle2} onClick={downDate}>-</button>
            </div>
        </div>
    )
}
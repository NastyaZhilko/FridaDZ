import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {changeInputTC, sortByDateDown, sortByDateUpTC} from "../../../store/packs-reducer";

export function SortByDate(){
    const dispatch = useDispatch()
    const pageCount = useSelector<any,any>(state=>state.cards.pageCount)
    const page = useSelector<any, any>(state => state.cards.page)
    const min = useSelector<any, any>(state => state.cards.minCardsCount)
    const max = useSelector<any, any>(state => state.cards.maxCardsCount)
    const sortPacks = useSelector<any, any>(state => state.cards.sortPacks)
    const inputValueSearch = useSelector<any, any>(state => state.cards.inputValueSearch)
    function upDate(){
        dispatch(sortByDateUpTC(page, pageCount, '0created', min, max, inputValueSearch))
    }
    function downDate(){
        dispatch(sortByDateDown(page, pageCount, '1created', min, max, inputValueSearch))
    }

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
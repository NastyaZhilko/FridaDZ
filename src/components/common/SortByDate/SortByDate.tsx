import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {sortByDateUpDown, sortByDateUpTC} from "../../../store/cards-reducer";

export function SortByDate(){
    const dispatch = useDispatch()
    const pageCount = useSelector<any,any>(state=>state.cards.pageCount)
    const page = useSelector<any, any>(state => state.cards.page)
    function upDate(){
        dispatch(sortByDateUpTC(page, pageCount, '0created'))
    }
    function downDate(){
        dispatch(sortByDateUpDown(page, pageCount, '1created'))
    }

    return(
        <div>
            <div>
            <button style={{width:'30px'}} onClick={upDate}>+</button>
            </div>
            <div>
            <button style={{width:'30px'}} onClick={downDate}>-</button>
            </div>
        </div>
    )
}
import ReactPaginate from 'react-paginate';
import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './PaginationComponent.module.css'
//import {cardPacksAPI} from "../../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {packsTC} from "../../../store/packs-reducer";

type PaginationComponentType={

    options: number[]

}

export function PaginationComponent({options}:PaginationComponentType) {
    const initValueOption = useSelector<any,any>(state=>state.cards.pageCount)
    const packs = useSelector<any, any>((state)=>state.cards.packsTotalCount)
    const sortPacks = useSelector<any, any>(state => state.cards.sortPacks)
    const min = useSelector<any, any>(state => state.cards.minCardsCount)
    const max = useSelector<any, any>(state => state.cards.maxCardsCount)
    const dispatch = useDispatch()
    const page = useSelector<any,any>((state=>state.cards.page))

    const [value, setValue] = useState(initValueOption)





    const pageCount = Math.ceil(packs/value)

    function pageChange(e:any){
        dispatch(packsTC(e.selected+1, value, sortPacks, min, max))

    }
    const paginationStyle={
        display:'flex',
        justifyContent:'flex-start',
        margin: '50px'
    }
    function changeSelect(e:ChangeEvent<HTMLSelectElement>){
        console.log(e.currentTarget.value)
        setValue(Number(e.currentTarget.value))

        dispatch(packsTC(page, Number(e.currentTarget.value),sortPacks, min, max ))
    }

    return (
        <div style={paginationStyle}>
            <select onChange={changeSelect} value={value}>
                {options.map((option, index)=>{
                   return <option key={index} value={option}>{option}</option>
            })}
            </select>
            <div>
            <ReactPaginate
                pageCount={pageCount}
                marginPagesDisplayed={5}
                pageRangeDisplayed={3}
                breakClassName={s.breakMe}
                containerClassName={s.pagination}
                activeClassName={s.active}
                onPageChange={pageChange}
            />
            </div>
        </div>
    )
}


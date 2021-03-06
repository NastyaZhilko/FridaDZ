import ReactPaginate from 'react-paginate';
import React, {ChangeEvent, useState} from 'react'
import s from './PaginationComponent.module.css'
//import {cardPacksAPI} from "../../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {packsTC} from "../../../store/packs-reducer";
import {AppStoreType} from "../../../store/store";

type PaginationComponentType={

    options: number[]

}

export function PaginationComponent({options}:PaginationComponentType) {
    const initValueOption = useSelector<AppStoreType,number>(state=>state.cards.pageCount)
    const packs = useSelector<AppStoreType, number>((state)=>state.cards.packsTotalCount)
    const sortPacks = useSelector<AppStoreType, string>(state => state.cards.sortPacks)
    const min = useSelector<AppStoreType, number>(state => state.cards.minCardsCount)
    const max = useSelector<AppStoreType, number>(state => state.cards.maxCardsCount)
    const inputValueSearch = useSelector<AppStoreType, string>(state => state.cards.inputValueSearch)
    const dispatch = useDispatch()
    const page = useSelector<AppStoreType,number>((state=>state.cards.page))

    const [value, setValue] = useState(initValueOption)


    const pageCount = Math.ceil(packs/value)

    function pageChange(e:any){
        dispatch(packsTC(e.selected+1, value, sortPacks, min, max,inputValueSearch))

    }
    const paginationStyle={
        display:'flex',
        justifyContent:'flex-start',
        margin: '50px'
    }
    function changeSelect(e:ChangeEvent<HTMLSelectElement>){
        console.log(e.currentTarget.value)
        setValue(Number(e.currentTarget.value))

        dispatch(packsTC(page, Number(e.currentTarget.value),sortPacks, min, max, inputValueSearch))
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


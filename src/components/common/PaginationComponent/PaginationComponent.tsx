import ReactPaginate from 'react-paginate';
import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './PaginationComponent.module.css'
import {cardPacksAPI} from "../../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {packsTC} from "../../../store/cards-reducer";

type PaginationComponentType={

    options: number[]

}

export function PaginationComponent({options}:PaginationComponentType) {
    const initValueOption = useSelector<any,any>(state=>state.cards.pageCount)
    const packs = useSelector<any, any>((state)=>state.cards.packsTotalCount)
    const sortPacks = useSelector<any, any>(state => state.cards.sortPacks)

    const dispatch = useDispatch()
    const page = useSelector<any,any>((state=>state.cards.page))

    // const [packs, setPacks] = useState(0)
   //const [page, setPage] = useState(1)
    const [value, setValue] = useState(initValueOption)
    // useEffect(()=>{
    //     cardPacksAPI.getCardPacks().then((data)=>{
    //         setPacks(data.data.cardPacksTotalCount)
    //         console.log(data)})
    // }, [page, value])




    const pageCount = Math.ceil(packs/value)

    function pageChange(e:any){
        //setPage(e.selected+1)
        dispatch(packsTC(e.selected+1, value, sortPacks))

    }
    const paginationStyle={
        display:'flex',
        justifyContent:'flex-start',
        margin: '50px'
    }
    function changeSelect(e:ChangeEvent<HTMLSelectElement>){
        console.log(e.currentTarget.value)
        setValue(Number(e.currentTarget.value))
        dispatch(packsTC(page, Number(e.currentTarget.value),sortPacks ))
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


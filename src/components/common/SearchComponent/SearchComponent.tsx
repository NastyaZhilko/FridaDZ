import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {changeInputTC, packsTC} from "../../../store/cards-reducer";


export function SearchComponent({cards}: any) {
    const dispatch = useDispatch()
    const pageCount = useSelector<any, any>(state => state.cards.pageCount)
    const page = useSelector<any, any>(state => state.cards.page)
    const sortPacks = useSelector<any, any>(state => state.cards.sortPacks)
    const min = useSelector<any, any>(state => state.cards.minCardsCount)
    const max = useSelector<any, any>(state => state.cards.maxCardsCount)
    //const [value, setValue] = useState('')
    //const [timerId, setTimerId] = useState<any>()
    // useEffect(()=>{
    //     dispatch(packsTC(page, pageCount))
    // },[])
     function debounce(fn:Function, ms:number){
        let timeout:any;
        return function(){
            console.log(1)
            //@ts-ignore
            const fnCall = () => {fn.apply(this,arguments)}
            clearTimeout(timeout);
            timeout = setTimeout(fnCall, ms)
        }
    }

    // function changeInput(e: ChangeEvent<HTMLInputElement>) {
    //     //setValue(e.currentTarget.value)
    //     console.log(e.target.value)
    //     const arr = cards.filter((card:any)=>{
    //        return  card.name.toLowerCase().indexOf(e.target.value.toLowerCase().trim()) !== -1
    //
    //     })
    //     dispatch({type:'SEARCHED-PACKS', arr})
    //     console.log(arr)
        //setValue(e.target.value)



    const changeInput = (e:any) => {

        // packsAPI.getCardPacks(page, pageCount).then((data) => {
        //
        //     const cards = data.data.cardPacks
        //
        //     const arr = cards.filter((card: any) => {
        //         return card.name.toLowerCase().indexOf(e.target.value.toLowerCase().trim()) !== -1
        //
        //     })
        //
        //     dispatch({type: 'SEARCHED-PACKS', arr})
        //
        // })
        dispatch(changeInputTC(e, page, pageCount, sortPacks, min, max))
    }

    // useEffect(() => {
    //     const timeout = setTimeout(handleSearch, 1000)
    //     setTimerId(timeout)
    //     return () => {
    //         clearTimeout(timerId)
    //     }
    //
    // }, [value])

    let debounceChangeInput = debounce(changeInput, 500)

    return (
        <div>
            <span>Search</span>
            <input type="text" onChange={debounceChangeInput} />
        </div>
    )
}
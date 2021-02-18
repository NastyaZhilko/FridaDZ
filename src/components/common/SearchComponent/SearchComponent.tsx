import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {changeInputTC} from "../../../store/packs-reducer";


export function SearchComponent() {
    const dispatch = useDispatch()
    const pageCount = useSelector<any, any>(state => state.cards.pageCount)
    const page = useSelector<any, any>(state => state.cards.page)
    const sortPacks = useSelector<any, any>(state => state.cards.sortPacks)
    const min = useSelector<any, any>(state => state.cards.minCardsCount)
    const max = useSelector<any, any>(state => state.cards.maxCardsCount)

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



    const changeInput = (e:any) => {

        dispatch(changeInputTC(e, page, pageCount, sortPacks, min, max))
    }

    let debounceChangeInput = debounce(changeInput, 500)

    return (
        <div>
            <span>Search</span>
            <input type="text" onChange={debounceChangeInput} />
        </div>
    )
}
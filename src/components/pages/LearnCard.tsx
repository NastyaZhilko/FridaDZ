import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {gradeTC, packCardsTC} from "../../store/packCards-reducer";

export function LearnCard(){
    const {packId} = useParams<{ packId: string }>();
    const dispatch = useDispatch()
    const cards = useSelector<any, any>(state=>state.packCards.cards)
    const [isAnswer, setIsAnswer] = useState(false)
    useEffect(()=>{
        dispatch(packCardsTC(packId))

    },[])
    function clickHandler(e:any){
        console.log(e.currentTarget.name)
        if(e.currentTarget.name==="oneButton"){
            dispatch(gradeTC({grade:1, card_id:cards[0]._id}))
        }else if(e.currentTarget.name==="twoButton"){
            dispatch(gradeTC({grade:2, card_id:cards[0]._id}))
        }else if(e.currentTarget.name==="threeButton"){
            dispatch(gradeTC({grade:3, card_id:cards[0]._id}))
        }else if(e.currentTarget.name==="fourButton"){
            dispatch(gradeTC({grade:4, card_id:cards[0]._id}))
        }else if(e.currentTarget.name==="fiveButton"){
            dispatch(gradeTC({grade:5, card_id:cards[0]._id}))
        }

    }
    function showAnswer(){
        setIsAnswer((isAnswer)=>{
            return !isAnswer
        })
    }
    return(
        <>
        {/*<div>{cards[0].question}---{cards[0].answer}</div>*/}
        <div>{cards[0].question}</div>
            <button onClick={showAnswer}>show answer</button>
            <div style={{height:'40px'}}>
                <div style={isAnswer?undefined:{display:'none'}}>{cards[0].answer}</div>
            </div>
            <div>
                <button onClick={clickHandler} name={"oneButton"}>не знал</button>
                <button onClick={clickHandler} name={"twoButton"}>забыл</button>
                <button onClick={clickHandler} name={"threeButton"}>долго думал</button>
                <button onClick={clickHandler} name={"fourButton"}>перепутал</button>
                <button onClick={clickHandler} name={"fiveButton"}>знал</button>
            </div>
        </>
    )
}
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import style from './learnsPage.module.css'
import {AppStoreType} from "../../store/store";
import {CardType} from "../../api/api";
import SuperButton from "../common/SuperButton/SuperButton";
import {getCardsTC, gradeTC} from "../../store/packCards-reducer";
import {Modal} from "./modal/modal";


export const LearnPage = () => {
    const {packId} = useParams<{ packId: string }>();
    const cards = useSelector<AppStoreType, Array<CardType>>(state => state.packCards.cards);
    const [checkMode, setCheckMode] = useState(false);
    const [numberCurrentCard, setNumberCurrentCard] = useState(0);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCardsTC(packId))

    },[])
    const checkAnswer = () => {
        setCheckMode(true);
    }



    const checkNextCard = () => {
        setNumberCurrentCard(sortCards(cards)) ;
        //numberCurrentCard < cards.length -1 ? setNumberCurrentCard(numberCurrentCard + 1) : setNumberCurrentCard(0);
        setCheckMode(false);
    }
    const addGrade = (grade: number) => {
        dispatch(gradeTC(cards[numberCurrentCard]._id, grade))
    }
    const sortCards = (cardsPack: CardType[]) => {
        let gradeArr = cardsPack.map((card, index) => {
            return {index, grade: card.grade ,chance: card.grade !==0 ? (5 - card.grade * Math.random()): 4}
        });
        let currentInd = 0;
        let maxVal = 0;
        gradeArr.forEach((el, index) => {
            if( maxVal < el.chance) {
                currentInd = el.index;
                maxVal = el.chance
            };
        })
        return currentInd
    }
    const show = useSelector<AppStoreType, boolean>(state => state.packCards.showSuccessModal)

    let top: number;
    if(show) {
        top = 100
    }else{
        top = -100
    }
    return (
        <div className={style.container}>
            <div>
                <div>
                    <p className={style.text}>{cards[numberCurrentCard] ? cards[numberCurrentCard].question: 'Have no cards'}</p>
                </div>
                <div>
                    <SuperButton onClick={checkAnswer} >check answer</SuperButton>
                </div>
            </div>
            {checkMode &&
            <div>
                <p className={style.text}>{cards[numberCurrentCard] ? cards[numberCurrentCard].answer: 'Have no cards'}</p>
                <div>
                    <SuperButton onClick={() => {addGrade(1)}} className={style.button}>не знал</SuperButton>
                    <SuperButton onClick={() => {addGrade(2)}} className={style.button}>забыл</SuperButton>
                    <SuperButton onClick={() => {addGrade(3)}} className={style.button}>перепутал</SuperButton>
                    <SuperButton onClick={() => {addGrade(4)}} className={style.button}>долго думал</SuperButton>
                    <SuperButton onClick={() => {addGrade(5)}} className={style.button}>знал</SuperButton>
                </div>
                <div>
                    <SuperButton className={style.button} onClick={checkNextCard}>След карточка</SuperButton>
                </div>
            </div>}
            <Modal title={"Success"} width={100} height={50} backgroundDiv={false} bgOnClick={() => {}}
                   CSSStyles={{
                       top: top+"px",
                       backgroundColor: "lightgreen"
                   }}
            />
        </div>
    )
}
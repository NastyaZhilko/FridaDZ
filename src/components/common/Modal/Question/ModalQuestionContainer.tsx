import React, {useState} from 'react';
import ModalQuestion from "./ModalQuestion";
import {ThunkAction} from "redux-thunk";

type PropsType = {
    title: string
    question: string

    action: () => ThunkAction<any, any, any, any>
}

const ModalQuestionContainer = (props: PropsType) => {
    const [show, setShow] = useState(false);
    const [answer, setAnswer] = useState(false);

    const setTrue = () => {
        setAnswer(true);
        setShow(false);
    };
    const setFalse = () => {
        setAnswer(false);
        setShow(false);
    };

    return (
        <>
            <div>
                <button onClick={() => setShow(true)}>{props.title}</button>
            </div>

            <ModalQuestion
                show={show}

                setTrue={setTrue}
                setFalse={setFalse}

                enableBackground={true}                           //серый затемняющий бэк на весь экран
                backgroundOnClick={() => setShow(false)}    //при клике отключает модалку

                width={300}
                height={200}
                action={props.action}

                question={props.question}
            />
        </>
    );
};

export default ModalQuestionContainer;
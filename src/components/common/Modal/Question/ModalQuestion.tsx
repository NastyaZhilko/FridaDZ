import React, {CSSProperties, ReactNode, useState} from 'react';
import Modal from "../Modal";
import {ThunkAction} from "redux-thunk";

interface IModalQuestion {
    show: boolean;

    setTrue: () => void;
    setFalse: () => void;
    buttonStyles?: CSSProperties;
    trueStyles?: CSSProperties;
    falseStyles?: CSSProperties;
    buttonTrue?: ReactNode;
    buttonFalse?: ReactNode;

    enableBackground?: boolean;
    backgroundOnClick?: () => void;

    width: number;
    height: number;
    modalStyle?: CSSProperties;
    modalOnClick?: () => void;

    action: () => ThunkAction<any, any, any, any>
    question: string
}

const ModalQuestion: React.FC<IModalQuestion> = (
    {
        setTrue,
        setFalse,


        trueStyles,
        falseStyles,
        buttonTrue = 'Yes',
        buttonFalse = 'No',

        enableBackground,                          //серый затемняющий бэк на весь экран
        backgroundOnClick = () => {
        },               //при клике отключает модалку

        width,
        height,
        modalOnClick = () => {
        },

        show,
        children,
        action,
        question
    }
) => {
    debugger

    return (
        <Modal
            enableBackground={enableBackground}             //серый затемняющий бэк на весь экран
            backgroundOnClick={backgroundOnClick}           //при клике отключает модалку

            width={width}
            height={height}
            modalOnClick={modalOnClick}

            show={show}
        >
            {question}
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: '20px',

                }}
            >
                <div onClick={setTrue}>
                    <button onClick={action} style={{...trueStyles}}>
                        {buttonTrue}
                    </button>
                </div>
                <button onClick={setFalse} style={{...falseStyles}}>{buttonFalse}</button>
            </div>
        </Modal>
    );
};

export default ModalQuestion;
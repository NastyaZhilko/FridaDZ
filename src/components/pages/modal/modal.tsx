import React from 'react';
import style from './modal.module.css'

type PropsType = {
    title: string
    width: number
    height: number
    backgroundDiv: boolean
    bgOnClick: () => void
    CSSStyles?:  React.CSSProperties
}

export const Modal: React.FC<PropsType> = (props) => {
    const modalStyles = {
        top: `calc(50vh - ${props.height / 2}px)`,
        left: `calc(50vw - ${props.width / 2}px)`,
        width: props.width,
        height: props.height,
        ...props.CSSStyles
    } as const
    return (
        <>
            {props.backgroundDiv && <div onClick={props.bgOnClick} className={style.backgroundDiv}></div>}
            <div className={style.modalWindow} style={modalStyles}>
                <h3>{props.title}</h3>
                <div className={style.buttonsStyle}>{props.children}</div>
            </div>
        </>
    )
}
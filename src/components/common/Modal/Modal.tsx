import React, {CSSProperties, useState} from 'react';

type ModalType = {
    enableBackground?: boolean;
    backgroundOnClick?: () => void;

    width: number;
    height: number;
    modalOnClick?: () => void;

    show: boolean
}

const Modal: React.FC<ModalType> = (
    {
        enableBackground,                       //серый затемняющий бэк на весь экран
        backgroundOnClick = () => {},           //при клике отключает модалку

        width,
        height,
        modalOnClick = () => {},

        show,
        children,

    }
) => {


    const top = `calc(50vh - ${height / 2}px)`;
    const left = `calc(50vw - ${width / 2}px)`;

    if (!show) return null;

    return (
        <>

            {enableBackground && <div       //бэкграунд
                style={{
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    width: '100vw',
                    height: '100vh',

                    background: 'black',
                    opacity: 0.35,
                    zIndex: 20,


                }}
                onClick={backgroundOnClick}  //при клике отключает модалку
            />}

            <div            //модалка
                style={{
                    position: 'fixed',
                    top,
                    left,
                    width,
                    height,
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '20px',

                    background: '#fff',
                    zIndex: 21,

                }}
                onClick={modalOnClick}
            >
                {children}
            </div>
        </>
    );
};

export default Modal;
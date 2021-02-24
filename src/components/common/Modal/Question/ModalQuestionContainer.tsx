import React, {useState} from 'react';
import ModalQuestion from "./ModalQuestion";

type PropsType = {
    title: string
    question: string
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
                {answer ? <span>Yes</span> : <span>No</span>}
            </div>

            <ModalQuestion
                show={show}

                setTrue={setTrue}
                setFalse={setFalse}

                enableBackground={true}
                backgroundOnClick={() => setShow(false)}

                width={300}
                height={200}

                children={props.question}
            />
        </>
    );
};

export default ModalQuestionContainer;
import React, {FC, useState} from 'react';
import {Modal} from "../modal";
import SuperButton from "../../../common/SuperButton/SuperButton";
import SuperInputText from "../../../common/SuperInput/SuperInput";

type PropsType = {
    updateCard: (id: string, question: string, answer: string) => void
    id: string
    disabled?: boolean
}
export const UpdateCardModal: FC<PropsType> = ({updateCard, id}: PropsType) => {

    const [value, setValue] = useState("")
    const [value2, setValue2] = useState("")

    const updateHandler = () => {
        updateCard && updateCard(id, value, value2)
        setValue("")
        if (value2 !== "") setValue2("")
    }
    return <Modal bgOnClick={() => {}}
                  title={"Enter new question and answer for card"}
                  width={500} height={300} backgroundDiv={true}>
        <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", marginTop: "20px"
        }}>
            <SuperInputText
                placeholder="Question"
                type="text"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
            />
            <SuperInputText
                placeholder="Answer"
                type="text"
                value={value2}
                onChange={(e) => setValue2(e.currentTarget.value)}
            />
            <div style={{display: "flex"}}>
                <SuperButton onClick={updateHandler}>Submit</SuperButton>
               {/* <SuperButton onClick={notUpdateHandler}>Cancel</SuperButton>*/}
            </div>
        </div>
    </Modal>
}
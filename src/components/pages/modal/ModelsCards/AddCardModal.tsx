import React, {FC, useState} from 'react';
import {Modal} from "../modal";
import SuperButton from "../../../common/SuperButton/SuperButton";
import SuperInputText from "../../../common/SuperInput/SuperInput";

type PropsType = {
    createItem?: (question?: string, answer?: string) => void
}
export const AddCardModal: FC<PropsType> = ({ createItem}:PropsType) => {

    let [displayModal, setDisplayModal] = useState(true)
    let [value, setValue] = useState("")
    let [value2, setValue2] = useState("")

    const createHandler = () => {
        createItem && createItem(value, value2)
        setDisplayModal(false)
        setValue("")
         if(value2 !== "") setValue2("")

    }
    return (
        <>

            {displayModal && <Modal bgOnClick={() => setDisplayModal(true)}
                                    title={"Enter question and answer for card"}
                                    width={500} height={200} backgroundDiv={true}>
                <input
                    placeholder="Question"
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                />
                <input
                    placeholder="Answer"
                    type="text"
                    value={value2}
                    onChange={(e) => setValue2(e.currentTarget.value)}
                />

                <div style={{display: "flex", justifyContent: "space-around", marginTop: "20px"}}>
                    <SuperButton onClick={createHandler}>Submit</SuperButton>

                </div>
            </Modal>}
        </>
    )
}
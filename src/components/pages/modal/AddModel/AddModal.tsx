import React, {FC, useState} from 'react';
import {Modal} from "../modal";
import SuperButton from "../../../common/SuperButton/SuperButton";

type PropsType = {
    createItem?: (title: string, answer?: string) => void
}
export const AddModal: FC<PropsType> = ({ createItem}:PropsType) => {

    let [displayModal, setDisplayModal] = useState(true)
    let [value, setValue] = useState("")
    let [value2, setValue2] = useState("")

    const createHandler = () => {
        createItem && createItem(value)
        setDisplayModal(false)
        setValue("")
        /* if(value2 !== "") setValue2("")*/

    }
    return (
        <>

            {displayModal && <Modal bgOnClick={() => setDisplayModal(true)} title={"Enter name of pack"}
                                    width={500} height={200} backgroundDiv={true}>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                />

                <div style={{display: "flex", justifyContent: "space-around", marginTop: "20px"}}>
                    <SuperButton onClick={createHandler}>Submit</SuperButton>

                </div>
            </Modal>}
        </>
    )
}
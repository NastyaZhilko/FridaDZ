import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Slider } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {changeSliderTC} from "../../../../store/cards-reducer";

type PropsType = {
    range: Array<number>
}

//export function SliderAnt({range}: PropsType){


// export function SliderAnt( ){
//     //const [range, setRange] = useState([0,23])
//     const dispatch = useDispatch()
//     const rangeMin = useSelector<any,any>(state=>state.cards.rangeMin)
//     const rangeMax = useSelector<any, any>(state=>state.cards.rangeMax)
// debugger
//     function onAfterChange(value:any){
//         console.log(value)
//
//         dispatch(changeSliderTC(value[0], value[1]))
//         //setRange(value)
//     }
//     function onChange(e:any){
//         console.log(e)
//         debugger
//
//         dispatch(changeSliderTC(e[0],e[1]))
//         //setRange(e)
//     }
//     return(
//         <div style={{display:'flex'}}>
//             <span>{0}</span>
//         <div style={{width:'200px'}}>
//         <Slider
//             range
//             step={1}
//             //defaultValue={[rangeMin, rangeMax]}
//              value={[rangeMin, rangeMax]}
//             onChange={onChange}
//             //onAfterChange={onAfterChange}
//             min={0}
//             max={24}
//         />
//         </div>
//             <span>{24}</span>
//         </div>
//     )
// }

export function SliderAnt( ){
    const [range, setRange] = useState([0,24])
    const dispatch = useDispatch()



    function onChange(e:any){
        console.log(e)

        dispatch(changeSliderTC(e[0],e[1]))
        setRange(e)
    }
    return(
        <div style={{display:'flex'}}>
            <span>{0}</span>
            <div style={{width:'200px'}}>
                <Slider
                    range
                    step={1}
                    //defaultValue={[rangeMin, rangeMax]}
                    value={[range[0], range[1]]}
                    onChange={onChange}
                    //onAfterChange={onChange}
                    min={0}
                    max={24}
                />
            </div>
            <span>{24}</span>
        </div>
    )
}

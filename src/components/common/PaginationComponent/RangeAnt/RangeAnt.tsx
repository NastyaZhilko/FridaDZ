import React, {useState, useRef} from 'react';
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
    const ref = useRef(null)
    const [range, setRange] = useState([0,24])

    const sortPacks = useSelector<any, any>(state => state.cards.sortPacks)
    const page = useSelector<any,any>((state=>state.cards.page))
    const pageCount = useSelector<any,any>(state=>state.cards.pageCount)
    const dispatch = useDispatch()



    function onChange(e:any){
       // console.log(e)
        //console.log(ref.current)

        //dispatch(changeSliderTC(e[0],e[1]))
        setRange(e)
    }
    function click(){
     //@ts-ignore
        const value = ref.current.props.value
        dispatch(changeSliderTC(page, pageCount,sortPacks, value[0],value[1]))


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
                    ref={ref}
                />
            </div>
            <span>{24}</span>
            <button onClick={click}>+++</button>
        </div>
    )
}


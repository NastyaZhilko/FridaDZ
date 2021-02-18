import React, {useState} from 'react'
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

type RangeComponentType = {
    min: number
    max: number
}

export function RangeComponent({min, max}:RangeComponentType){
    //const [value, setValue] = useState([min, max])
    const rangeStyle = {
        width: '350px',
        height: '70px',
        margin: '50px'
    }
    const currentRanges = {
        display: 'flex',
        justifyContent: 'space-around '
    }
    // function changeValue(e:any){
    //     setValue([e[0], e[1]])
    // }

    console.log(min)
    console.log(max)
    debugger
    return(
        <div style={rangeStyle}>
            <div style={currentRanges}>
            {/*<span>{value[0]}</span>*/}
            {/*<span>{value[1]}</span>*/}
            <span>{0}</span>
            <span>{24}</span>
            </div>
            {/*<Range allowCross={false} onChange={changeValue} min={min} max={max} defaultValue={[1,20]} value={value}/>*/}
            {/*<Range min={min} max={max} defaultValue={[min,max]} />*/}
            <Range min={0} max={24} defaultValue={[4,20]} />
        </div>
    )
}

import React, {useState, useRef} from 'react';
import 'antd/dist/antd.css';
import { Slider } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {changeSliderTC} from "../../../../store/packs-reducer";


export function SliderAnt( ){
    const ref = useRef(null)
    const [range, setRange] = useState([0,24])

    const sortPacks = useSelector<any, any>(state => state.cards.sortPacks)
    const page = useSelector<any,any>((state=>state.cards.page))
    const pageCount = useSelector<any,any>(state=>state.cards.pageCount)
    const inputValueSearch = useSelector<any, any>(state => state.cards.inputValueSearch)
    const dispatch = useDispatch()



    function onChange(e:any){
        setRange(e)
    }
    function click(){
     //@ts-ignore
        const value = ref.current.props.value
        dispatch(changeSliderTC(page, pageCount,sortPacks, value[0],value[1], inputValueSearch))


    }
    return(
        <div style={{display:'flex'}}>
            <span>{0}</span>
            <div style={{width:'200px'}}>
                <Slider
                    range
                    step={1}
                    value={[range[0], range[1]]}
                    onChange={onChange}
                    min={0}
                    max={24}
                    ref={ref}
                />
            </div>
            <span>{24}</span>
            <button onClick={click}>Cards</button>
        </div>
    )
}


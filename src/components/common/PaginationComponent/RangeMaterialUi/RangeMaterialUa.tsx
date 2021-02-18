import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

function valuetext(value: number) {
    return `${value}°C`;
}

export default function RangeSlider() {
    const classes = useStyles();
    const [value, setValue] = React.useState<number[]>([0, 24]);

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
        //debounceChange()
        console.log(newValue)


    };
    // function foo(){
    //     console.log(value)
    // }
    // let debounceChange = debounce(foo, 1500)
    //
    // function debounce(fn:Function, ms:number){
    //     let timeout:any;
    //     return function(){
    //         //@ts-ignore
    //         const fnCall = () => {fn.apply(this,arguments)}
    //         clearTimeout(timeout);
    //         timeout = setTimeout(fnCall, ms)
    //     }
    // }


    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                CardsCount range
            </Typography>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                min={0}
                max={24}
                marks={true}
            />
        </div>
    );
}
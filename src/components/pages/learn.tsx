import React from 'react';
import {NavLink} from "react-router-dom";

export function Learn({packId}:any){
    return(
        <NavLink to={`/learn/${packId}`}>learn</NavLink>
    )
}
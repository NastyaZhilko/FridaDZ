import React from 'react';
import {NavLink} from "react-router-dom";

export function Cards({packId}:any){
    return(
        <NavLink to={`/packs/${packId}`}>cards</NavLink>
    )
}
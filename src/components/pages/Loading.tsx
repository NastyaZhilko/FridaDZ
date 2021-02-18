import React from "react";
import preloader from '../common/preloader.svg'
function Loading(){
    return(
        <div>
            <img src={preloader} />
        </div>
    )
}
export default Loading
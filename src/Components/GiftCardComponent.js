import React from "react";

export function GiftCardComponent({link, size}){
    return (
            <img src={link} alt="GIF" width={100} height={100} style={{border: '3px solid grey'}}></img>
    )
}
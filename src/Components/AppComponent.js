import React, { useEffect } from "react";
import { GiftCardComponent } from "./GiftCardComponent";
import { useState } from "react";
import axios from "axios";
import { SearFieldComponent } from "./SearchFieldComponent";
export function AppComponent(){
    const API_KEY = "kZ7VvaylfsjTpKaM58QZZevBfZnatCfU";
    const[currentDisplay, setCurrentDisplay] = useState([]);
    const[currentDisplayName, setCurrentDisplayName] = useState("Trending Gift");
    useEffect(()=>{
        async function getcurrentDisplay(){
            try {
                await axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`).then((response) =>{
                    setCurrentDisplay(response.data.data);
                    console.log("aoi array",response.data.data);
                });
            } catch (error) {
                console.log(error);
            }
        }
        getcurrentDisplay();
    },[]);
    
    return (
        <div>
            <SearFieldComponent setCurrentDisplayName={setCurrentDisplayName} setcurrentDisplay={setCurrentDisplay}></SearFieldComponent>
            <div>
                <h1>{currentDisplayName}</h1>
                <div style={{textAlign: 'center', border: '5px solid black'}}>
                    {
                        currentDisplay?.filter((data, index, array) => array.findIndex(item => item.id === data.id) === index).map((data)=>{
                            return(
                                <GiftCardComponent key={data.id} link = {data?.images?.original?.url}></GiftCardComponent>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
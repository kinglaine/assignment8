import React, { useEffect } from "react";
import { GiftCardComponent } from "./GiftCardComponent";
import { useState } from "react";
import axios from "axios";
export function AppComponent(){
    const API_KEY = "kZ7VvaylfsjTpKaM58QZZevBfZnatCfU";
    const[trendingGifts, setTrendingGifts] = useState([]);
    const[currentDisplay, setCurrentDisplay] = useState("Trending Gift");
    useEffect(()=>{
        async function getTrendingGifts(){
            try {
                await axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`).then((response) =>{
                    setTrendingGifts(response.data.data);
                    console.log("aoi array",response.data.data);
                });
            } catch (error) {
                console.log(error);
            }
        }
        getTrendingGifts();
    },[]);
    const searchStyle = {
        float:'right'
    };
    const containerStyle = {
        
    };
    const childStyle = {
        textAlign: 'center',
        border: '5px solid black' 
    };
    return (
        <div>
            <div style={searchStyle}>
                <form>
                    <input type="text" name="Search" placeholder="search GIF"></input>
                    <button type="submit">Search</button>
                </form>
            </div>
            <div style={containerStyle}>
                <h1>{currentDisplay}</h1>
                <div style={childStyle}>
                    {
                        trendingGifts?.map((data)=>{
                            return(
                                //<iframe key={link.id} src={link.embed_url}/>
                                <GiftCardComponent key={data.id} link = {data.images?.original?.url}></GiftCardComponent>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
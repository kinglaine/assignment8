import React, { useEffect } from "react";
import { GiftCardComponent } from "./GiftCardComponent";
import { useState } from "react";
import axios from "axios";
export function AppComponent(){
    const API_KEY = "kZ7VvaylfsjTpKaM58QZZevBfZnatCfU";
    const[currentDisplay, setcurrentDisplay] = useState([]);
    const[currentDisplayName, setCurrentDisplayName] = useState("Trending Gift");
    const[searchTerm, setSearchTerm] = useState("");
    useEffect(()=>{
        async function getcurrentDisplay(){
            try {
                await axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`).then((response) =>{
                    setcurrentDisplay(response.data.data);
                    console.log("aoi array",response.data.data);
                });
            } catch (error) {
                console.log(error);
            }
        }
        getcurrentDisplay();
    },[]);
    //submit function to search custom GIF
    const handleSubmit = async (event) =>{
        event.preventDefault();
        setCurrentDisplayName(`Search Results for "${searchTerm}"`);
        try {
            await axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API_KEY}`).then((response) =>{
                setcurrentDisplay(response.data.data);
                console.log("aoi array",response.data.data);
            });
        } catch (error) {
            console.log(error);
        }
    } 
    //function that monitors values in search bar and set it to setSearchTerm variable
    const handleChange = (event) =>{
        setSearchTerm(event.target.value);
    }
    return (
        <div>
            <div style={{float:'right'}}>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="Search" placeholder="search GIF" onChange={handleChange} value={searchTerm}></input>
                    <button type="submit">Search</button>
                </form>
            </div>
            <div>
                <h1>{currentDisplayName}</h1>
                <div style={{textAlign: 'center', border: '5px solid black'}}>
                    {
                        currentDisplay?.map((data)=>{
                            return(
                                //<iframe key={link.id} src={link.embed_url}/>
                                <GiftCardComponent key={data.id} link = {data.images?.original?.url} size = {currentDisplay.length}></GiftCardComponent>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
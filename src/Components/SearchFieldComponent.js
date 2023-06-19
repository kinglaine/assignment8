import React from "react";
import { useState } from "react";
import axios from "axios";
export function SearFieldComponent({setCurrentDisplayName, setcurrentDisplay}){
    const API_KEY = "kZ7VvaylfsjTpKaM58QZZevBfZnatCfU";
    const[searchTerm, setSearchTerm] = useState("");
    //submit function to search custom GIF.
    const handleSubmit = async (event) =>{
        //this prevents the page from refresshing, which will lead to the default state.
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
    //function that monitors values in search bar and set it to setSearchTerm variable.
    const handleChange = (event) =>{
        setSearchTerm(event.target.value);
    }
    return(
        <div style={{float:'right'}}>
            <form onSubmit={handleSubmit}>
                <input type="text" name="Search" placeholder="search GIF" onChange={handleChange} value={searchTerm}></input>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}
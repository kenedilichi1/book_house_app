import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookLogo from "../assets/images/book_house_logo.png";
import ProfilePicture from "../assets/images/profile.jpg";
import { useParams } from "react-router-dom";

const Logo = styled.img`
    width: 3.5rem;
    border-radius: 50px;
`
const UserPicture = styled.img`
    width: 5rem;
` 

const UserDashBoard = () => {
    const [person, setPerson] = useState("");
    const username = useParams();
    
    console.log(username, "username");

    async function getUser(){
        const userDetails = await axios.get(`http://localhost:5200/auth/users/${username.username}`)
       
        .then((response) =>{
            const profile = response.data.payload;
            
            setPerson(profile)
            console.log(profile, "profile")
        })
        console.log(userDetails, "userdetails")

        return ;
    }
    // console.log(getUser)
   
    console.log(person, "person");
    const userProfile = person[0]
    
    useEffect(()=>{
        (async function(){
            const displayUser = await getUser()
            return displayUser
        })()
    }, [])
    
   
    
    return ( 
        <div>
            <div className="nav">
                <div>
                    <img src={BookLogo} alt= ""/>
                </div>
            </div>
            
            {userProfile.map((user)=>{

                return(
                    <div>
                        <div>
                            <img src= {ProfilePicture} alt="" />
                        </div>
                        <h3>{user.fullName}</h3>
                        <h3>{user.username}</h3>
                        <h3>{user.email}</h3>
                    </div>
                )
            })}
            
        </div>
    );
}
 
export default UserDashBoard ;
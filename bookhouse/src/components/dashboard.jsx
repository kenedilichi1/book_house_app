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
    border-radius: 6rem;
` 
const Profile = styled.div`
    border: 1px solid gray;
    width: 70%;
    margin:4rem auto 0;
    text-align: center;
    padding: 2rem 0;
    color: #FFFFFF;
    font-size: 1rem;
    font-weight: 400;
    border-radius: 1rem;
`
const Nav = styled.div`
    display: flex;
    flex-direction:row;
    align-items: center;
    background: #080414;
    padding: .7rem 1.5rem;

`
const Details = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap:1rem;
`


const UserDashBoard = () => {
    const [person, setPerson] = useState([]);
    const username = useParams();
    
    console.log(username, "username");

    async function getUser(){
        const response = await axios.get(`http://localhost:5200/auth/users/${username.username}`)
       
        
        console.log(response, "userdetails")

        return response.data.payload ;
    }
    // console.log(getUser)
   
    
    useEffect(()=>{
        (async function(){
            const displayUser = await getUser()
            setPerson(displayUser);
            
        })()
    }, [])
    console.log(person, "person")
   
    
    return ( 
        <div>
            <Nav>
                <div>
                    <Logo src={BookLogo} alt= ""/>
                </div>
            </Nav>
            
            {person.map((user)=>{

                return(
                    <Profile>
                        <div>
                            <UserPicture src= {ProfilePicture} alt="" />
                        </div>
                        <div>
                            <Details>
                                <h3>Full Name:</h3>
                                <h3>{user.fullName}</h3>
                            </Details>
                            <Details>
                                <h3>Username:</h3>
                                <h3>{user.username}</h3>
                            </Details>
                            <Details>
                                <h3>Email:</h3>
                                <h3>{user.email}</h3>
                            </Details> 
                        </div>
                    </Profile>
                )
            })}
            
        </div>
    );
}
 
export default UserDashBoard ;
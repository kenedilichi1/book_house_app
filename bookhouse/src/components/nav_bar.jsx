import React from "react";
import BookLogo from "../assets/images/book_house_logo.png";
import styled from "styled-components";
import SignIn from "./sign_in";
import { NavLink } from "react-router-dom";


const Nav = styled.div`
    display: flex;
    flex-direction:row;
    align-items: center;
    background: #080414;
    padding: .7rem 1.5rem;

`

const NavLogoSection = styled.div`
    display:flex;
    align-items:center;
    background:
`
const Logo = styled.img`
    width: 3.5rem;
    border-radius: 50px;
`


const NavLinks = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    margin-left: auto;
    margin-right: 0;
`
const Home = styled.a`
    text-decoration: none;
    width:3.5rem;
    height: 1.5rem;
    background: grey;
    padding-top: 4px;
    padding-left:13px;
    border-radius:10px;
`
const AboutUs = styled.a`
    text-decoration: none;
    width: 5.5rem;
    height: 1.5rem;
    background: #182d57;
    color: white;
    padding-top: 4px;
    padding-left:13px;
    border-radius:10px;
`

const Button = styled.a`
   
    text-decoration: none;
    width:3.5rem;
    height: 1.5rem;
    background: grey;
    padding-top: 4px;
    padding-left:13px;
    border-radius:10px;
`

const NavBar = function(){
    return (
        <Nav>
            <NavLogoSection>
                <div id="nav-img">
                    <Logo src= {BookLogo}/>
                </div>

                {/* <div>
                    <Text>BOOK HOUSE</Text>
                </div> */}
            </NavLogoSection>

            <NavLinks>
                <NavLink to= "/">
                    <Home>Home</Home>
                </NavLink>
                <NavLink to="/aboutus">
                    <AboutUs>About Us</AboutUs>
                </NavLink>
            </NavLinks>
            <NavLink to= "/signin">
                <Button>Sign In</Button>
            </NavLink>
        </Nav>
    );
}
 
export default NavBar ;
import React from "react";
import styled from "styled-components";
import BookLogo from "../../assets/images/book_house_logo.png";
import { NavLink, useParams } from "react-router-dom";
import ProfilePicture from "../../assets/images/profile.jpg";

const Logo = styled.img`
    width: 3.5rem;
    border-radius: 50px;
`
const Nav = styled.div`
    display: flex;
    flex-direction:row;
    align-items: center;
    background: #080414;
    padding: .7rem 1.5rem;
    padding-right: .5rem;

`
const NavLinks = styled.div`
    margin-left: auto;
    margin-right: 0;
    display:flex;
    align-items: center;
`
const Links = styled.a`
    text-decoration: none;
    color: white;
    border: 1px solid gray;
    border-radius: .8rem;
    padding: .5rem 1rem;

`
const LinkNav = styled(NavLink)`
    text-decoration: none;
    margin-right: .5rem ;
`
const ProfileImage = styled.img`
    width: 3rem;
    border-radius:4rem;
`
const UserNav = () => {
    let bookhouse = localStorage.getItem("bookHouse");
    let user = JSON.parse(bookhouse).username;
    return ( 
            <Nav>
                <div>
                    <Logo src={BookLogo} alt= ""/>
                </div>
                <NavLinks>
                    <LinkNav to={`/${user}/home`} >
                        <Links>Home</Links>
                    </LinkNav>

                    <LinkNav to= {`/${user}/shelf`}>
                        <Links>Shelf</Links>
                    </LinkNav>
                </NavLinks>
                <div>
                    <LinkNav to ={`/dashboard/${user}`}>
                        <ProfileImage src={ProfilePicture} alt="profile" />
                    </LinkNav>
                </div>
            </Nav>
    );
}
 
export default UserNav;
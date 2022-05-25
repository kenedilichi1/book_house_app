import axios from "axios";
import React, { useReducer, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BookLogo from "../../assets/images/book_house_logo.png";

const SignInMainDiv = styled.div`
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:1rem;
`
const FormDiv = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    border: 1px solid gray;
    border-radius: .6rem;
    width:18rem;
    height: 15rem;
    text-align: center;
`
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
const Input = styled.input`
    width: 13rem;
    height: 2rem;
    border:1px solid gray;
    background: transparent;
    color: white;
    font-size:.9rem;
    font-weight:300;
    outline:none;
    border-radius: .7rem;
    padding: .5rem 1rem;
`
const Form = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    gap: 1.1rem;
    padding: 1rem 0;
`

const Button= styled.button`
    width: 6rem;
    height: 2rem;
    border: none;
    border-radius: .5rem;
    background: #193a70;
    color:white;
    font-weight:500;
    font-size: .9rem;
`
const Header = styled.h3`
    foonst-size:3.8rem;
    font-weight:600;
    color: white;

`
const ForgotPass = styled.a`
    color: white;
`

const DontHave = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: white;
`
const SignUp = styled.a`
    color: white;
`

const SignIn = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    
    async function signin(){
        try {
            const user ={
                email: email,
                password: password
            }
            if(!user.email&& !user.password){
                throw new Error("enter correct credentials")
            }
            const userSignIn = await axios.post('http://localhost:5200/auth/users/login', user);
            console.log(userSignIn, "userSignIn")
            
            localStorage.setItem("bookHouse", JSON.stringify({
                id:userSignIn.data.payload.id, 
                email: userSignIn.data.payload.email,
                username: userSignIn.data.payload.username
            }))
            localStorage.setItem("token", userSignIn.data.token);
            let bookhouse = localStorage.getItem("bookHouse");
            let username = JSON.parse(bookhouse).username;
            navigate(`/dashboard/${username}`);
            console.log(username)
            
            
        } catch (error) {
            console.log(error, "error")
            return
        }
    }

    return (
        <div>
            <Nav>
                <NavLogoSection>
                    <div id="nav-img">
                        <Logo src= {BookLogo}/>
                    </div>
                </NavLogoSection>

                <NavLinks>
                    <NavLink to= "/">
                        <Home>Home</Home>
                    </NavLink>
                    <NavLink to="/aboutus">
                        <AboutUs>About Us</AboutUs>
                    </NavLink>
                </NavLinks>
            </Nav>
            <SignInMainDiv>
                <div>
                    <Header>Sign In to Book House</Header>
                </div>
                <FormDiv>
                    <Form>
                        <div>
                        <Input type="email" placeholder="Enter your Email" onChange={(e)=>setEmail(e.target.value)} />
                        </div>

                        <div>
                        <Input type="password" placeholder="Enter your Password" onChange={(e)=>setPassword(e.target.value)} />
                        </div>

                    </Form>
                    <div>
                        <Button onClick={()=>{signin()}}>
                            Sign In
                        </Button>
                    </div>
                    <div>
                        <ForgotPass href="#">Forgot password?</ForgotPass>
                    </div>
                </FormDiv>

                <DontHave>
                    <p>Don't have an account?</p>
                    <NavLink to="/signup">
                       <SignUp>signup</SignUp> 
                    </NavLink>
                </DontHave>

            </SignInMainDiv>
        </div>
       
    );
}
 
export default SignIn;
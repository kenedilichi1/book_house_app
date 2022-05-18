import React, { useState } from "react";
import BookLogo from "../../assets/images/book_house_logo.png";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';


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
const MidSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:1.5rem;
`
const FormDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .6rem;
    border: 1px solid gray;
    border-radius: .6rem;
    margin-top: 2.5rem;
    padding: 1rem .5rem;
    width: 80%;


`
const Input = styled.input`
    width: 13rem;
    height: 2rem;
    outline:none;
    font-size:.9rem;
    font-weight:500;
    border-radius: .7rem;
    border:1px solid gray;
    padding: .2rem .5rem;
    background: transparent;
    color: white;
`
const Button = styled.button`
    width:8rem;
    height:2.5rem;
    outline:none;
    border:none;
    border-radius:.6rem;
    background: #193a70;
    color:white;
    font-weight:500;
    font-size: .9rem;
    cursor:pointer;
`
const HaveAccount = styled.div`
    display:flex;
    justify-content: center;
    gap:.6rem;
`
// submit function



const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    let navigate = useNavigate();
    // submit function
    async function signup(){
        try {
            const user = {
                fullName: `${fullName}`,
                username: `${username}`,
                email: `${email}`,
                password: `${password}`,
                confirmPassword: `${confirmPassword}`
            }
    
            const userSignUp = await axios.post('http://localhost:5200/auth/users/signup', user)
                .then(navigate("/signin", {state: {email: `${email}`}}))
        } catch (error) {
            console.log(error)
        }
        
    }

    function setToEmpty(){
        setFullName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("")
    }
    return ( 
        <div>
            <Nav>
                <NavLogoSection>
                    <div id="nav-img">
                        <Logo src= {BookLogo}/>
                    </div>
                </NavLogoSection>
            </Nav>

            <MidSection>
                <FormDiv>
                    <div>
                        <Input type="text" placeholder="Enter Full Name" value={fullName} onChange={(e) =>setFullName(e.target.value)} />
                    </div>
                    <div>                       
                        <Input type="text" placeholder="Enter Username" value={username}  onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div>                       
                        <Input type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div>                    
                        <Input type="password" placeholder="Enter your Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                    </div>
                    <div>
                        <Button onClick={()=>{
                            signup();
                            setToEmpty();
                        }}>Submit</Button >
                    </div>
                </FormDiv>

                <HaveAccount>
                    <p>Aready have an account?</p>
                    <NavLink to="/signin">
                        <a>sign in</a>
                    </NavLink>
                </HaveAccount>
            </MidSection>
        </div>
    );
}
 
export default SignUp;
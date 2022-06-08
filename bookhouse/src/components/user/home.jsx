import axios from "axios";
import React, { useEffect, useState } from "react";
import UserNav from "./nav";
import styled from "styled-components";

const HeaderText = styled.h1`
    color: white;
    font-weight: 500;
    font-size:2.5rem;
` 
const HomeBody = styled.div`
    padding: 2rem 1.5rem 0;
    

`
const Header = styled.div`
    text-align:center;

`
const BookShelf = styled.div`
    border: 1px solid gray;
    border-radius: .6rem;
    padding: 1.5rem 1rem;
    margin: 2rem 0 0 0;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:1.5rem;
`
const BookDetails = styled.div`
    border:1px solid gray;
    border-radius:.8rem;
    -webkit-box-shadow: 3px 3px 5px 0px rgba(242,234,242,1);
    -moz-box-shadow: 3px 3px 5px 0px rgba(242,234,242,1);
    box-shadow: 3px 3px 5px 0px rgba(242,234,242,1);
    height:10rem;
    padding-top:1rem;
`
const Details = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center
    color: white;
    gap: 1rem;
    padding:.3rem 1rem;
`
const Label = styled.h3`
    color: white;
    font-weight:500;
    font-size:1rem;
`
const Text = styled.h3`
    color: white;
    font-weight:400;
    font-size:.9rem;
`
const BorrowBookDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    gap: 1.4rem;
    margin: 2.5rem 0;
`
const BorrowBookHeader = styled.div`
    text-align: center;
`
const BorrowBookInput = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:1rem;
`
const BookHeader = styled.h1`
    color: white;
    font-weight:500;
    font-size:2.5rem;
`
const BookInput = styled.input`
    height: 2rem;
    width: 15rem;
    background: transparent;
    color: white;
    border: 1px solid gray;
    outline: none;
    border-radius:.7rem;
    padding: .3rem 1rem;
    font-size: 1rem;
    font-weight: 400;
`
const BookButton = styled.button`
    width: 6rem;
    height:2.5rem;
    font-size: .9rem;
    font-weight: 400;
    color: white;
    background: #080414;
    border: 1px solid gray;
    border-radius: 1rem;
    cursor: pointer;
`

const UserHome = () => {
    const [books, setBooks]= useState([]);
    const [username, setUsername] =useState("")
    const [bookName, setBookName] = useState("")
    // getting all books
    async function getBooks(){
        const response = await axios.get('http://localhost:5200/bookhouse/books');

        return response.data.payload;
    }

    // adding book to book shelf
    async function addToShelf(){
        try {
            const token = localStorage.getItem("token")
            const details = {
                username: username,
                bookName: bookName
            }
            if(details.username&& details.bookName === ""){
                throw new Error("Enter correct credentials")
            }
            const toBookShelf = await axios.post('http://localhost:5200/bookShelf/books',details,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        (async function(){
            const displayBooks = await getBooks();
            setBooks(displayBooks);
        })()
    },[])
    return ( 
        <div>
            <div>
                <UserNav />
            </div>
            
            <HomeBody>
                <Header>
                    <HeaderText>Book Shelf</HeaderText>
                </Header>
                <BookShelf>
                    {books.map((book)=>{
                            return(
                                <BookDetails onClick={()=>{console.log(book)}}>
                                    <Details>
                                        <Label>Book Name:</Label>
                                        <Text>{book.bookName}</Text>
                                    </Details>
                                    <Details>
                                        <Label>Author:</Label>
                                        <Text>{book.author}</Text>
                                    </Details>
                                    <Details>
                                        <Label>Rating:</Label>
                                        <Text>{book.rating}</Text>
                                    </Details>
                                    <Details>
                                        <Label>Genre:</Label>
                                        <Text>{book.genre.join(", ")}</Text>
                                    </Details>
                                </BookDetails>
                                
                            )
                        })

                    }
                    
                </BookShelf>

                <BorrowBookDiv>
                    <BorrowBookHeader>
                        <BookHeader>Borrow a Book</BookHeader>
                    </BorrowBookHeader>
                    <BorrowBookInput>
                        <BookInput type="text" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)} />
                        <BookInput type="text" placeholder="Enter book name" onChange={(e)=>setBookName(e.target.value)}/>
                    </BorrowBookInput>
                    <div>
                        <BookButton onClick={()=>{addToShelf()}}>Submit</BookButton>
                    </div>
                </BorrowBookDiv>
            </HomeBody> 
            
            
        </div>
    );
}
 
export default UserHome ;
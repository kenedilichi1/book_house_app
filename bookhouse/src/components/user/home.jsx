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

const UserHome = () => {
    const [books, setBooks]= useState([]);

    async function getBooks(){
        const response = await axios.get('http://localhost:5200/bookhouse/books');

        return response.data.payload;
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
                                <BookDetails>
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
            </HomeBody> 
            
            
        </div>
     );
}
 
export default UserHome ;
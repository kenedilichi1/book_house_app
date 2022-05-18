import axios from "axios";
import React, { useEffect, useState } from "react";
import UserNav from "./nav";

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
            
            <div>
                <div>
                    <h1>Book Shelf</h1>
                </div>
                <div>
                    {books.map((book)=>{
                            return(
                                <div>
                                    <h3>Book Name:</h3>
                                    <h3>{book.bookName}</h3>
                                </div>
                            )
                        })

                    }
                    
                </div>
            </div> 
            
            
        </div>
     );
}
 
export default UserHome ;
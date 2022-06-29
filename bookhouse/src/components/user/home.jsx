import axios from "axios";
import React, { useEffect, useState } from "react";
import UserNav from "./nav";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { header } from "../../shared/token";

const HeaderText = styled.h1`
  color: white;
  font-weight: 500;
  font-size: 2.5rem;
`;
const HomeBody = styled.div`
  padding: 2rem 1.5rem 0;
`;
const Header = styled.div`
  text-align: center;
`;
const BookShelf = styled.div`
  border: 1px solid gray;
  border-radius: 0.6rem;
  padding: 1.5rem 1rem;
  margin: 2rem 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;
const BookDetails = styled.div`
  border: 1px solid gray;
  border-radius: 0.8rem;
  -webkit-box-shadow: 3px 3px 5px 0px rgba(242, 234, 242, 1);
  -moz-box-shadow: 3px 3px 5px 0px rgba(242, 234, 242, 1);
  box-shadow: 3px 3px 5px 0px rgba(242, 234, 242, 1);
  height: 10rem;
  padding-top: 1rem;
`;
const Details = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center
    color: white;
    gap: 1rem;
    padding:.3rem 1rem;
`;
const Label = styled.h3`
  color: white;
  font-weight: 500;
  font-size: 1rem;
`;
const Text = styled.h3`
  color: white;
  font-weight: 400;
  font-size: 0.9rem;
`;
const BorrowBookDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  margin: 2.5rem 0;
`;
const BorrowBookHeader = styled.div`
  text-align: center;
`;
const BorrowBookInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const BookHeader = styled.h1`
  color: white;
  font-weight: 500;
  font-size: 2.5rem;
`;
const BookInput = styled.input`
  height: 2rem;
  width: 15rem;
  background: transparent;
  color: white;
  border: 1px solid gray;
  outline: none;
  border-radius: 0.7rem;
  padding: 0.3rem 1rem;
  font-size: 1rem;
  font-weight: 400;
`;
const BookButton = styled.button`
  width: 6rem;
  height: 2.5rem;
  font-size: 0.9rem;
  font-weight: 400;
  color: white;
  background: #080414;
  border: 1px solid gray;
  border-radius: 1rem;
  cursor: pointer;
`;

const UserHome = () => {
  const [books, setBooks] = useState([]);
  const user = useParams();
  // getting all books
  async function getBooks() {
    const response = await axios.get("http://localhost:5200/bookhouse/books", {
      headers: header,
    });

    return response.data.payload;
  }

  // adding book to book shelf
  async function addToShelf(details) {
    try {
      const token = localStorage.getItem("token");
      if (details.username && details.bookName === "") {
        throw new Error("Enter correct credentials");
      }
      console.log(header, "2");
      const toBookShelf = await axios.post(
        "http://localhost:5200/bookShelf/books",
        details,
        {
          headers: header,
        }
      );
      console.log(toBookShelf.data, "response from toBookShelf");
    } catch (error) {
      console.log(error.message, "error");
      console.log(error, "error*");
    }
  }

  useEffect(() => {
    (async function () {
      const displayBooks = await getBooks();
      setBooks(displayBooks);
    })();
  }, []);
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
          {books.map((book) => {
            return (
              <BookDetails
                onClick={() => {
                  console.log(book);

                  const userAndBookDetails = {
                    username: user.username,
                    bookName: book.bookName,
                  };
                  console.log(userAndBookDetails, "details");
                  addToShelf(userAndBookDetails);
                }}
              >
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
            );
          })}
        </BookShelf>
      </HomeBody>
    </div>
  );
};

export default UserHome;

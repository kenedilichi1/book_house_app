import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./nav";
import { header } from "../../shared/token";
import axios from "axios";
import { useEffect } from "react";
const Shelf = () => {
  const [shelf, setShelf] = useState([]);
  const user = useParams().username;
  console.log(user);
  async function getShelf() {
    const response = await axios.get(
      `http://localhost:5200/bookshelf/${user}/books`,
      {
        headers: header,
      }
    );

    return response.data.payload;
  }

  useEffect(() => {
    (async function () {
      const displayUserShelf = await getShelf();
      setShelf(displayUserShelf);
    })();
  }, []);
  return (
    <div>
      <div>
        <Nav />
      </div>
      {shelf.map((book) => {
        return (
          <div>
            <h3>Book Name</h3>
            <h3>{book.bookName}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Shelf;

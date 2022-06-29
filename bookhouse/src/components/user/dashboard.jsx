import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserNav from "./nav";
import ProfilePicture from "../../assets/images/profile.jpg";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { header } from "../../shared/token";

const UserPicture = styled.img`
  width: 5rem;
  border-radius: 6rem;
`;
const Profile = styled.div`
  border: 1px solid gray;
  width: 20rem;
  margin: 4rem auto 0;
  text-align: center;
  padding: 2rem 0;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 400;
  border-radius: 1rem;
`;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const UserDashBoard = () => {
  const [person, setPerson] = useState([]);
  const username = useParams();
  let bookhouse = localStorage.getItem("bookHouse");
  // let user = JSON.parse(bookhouse).username;
  // const token = localStorage.getItem("token");

  // console.log(user, "username");

  async function getUser() {
    const response = await axios.get(
      `http://localhost:5200/auth/users/${username.username}`,
      {
        headers: header,
      }
    );

    console.log(response, "userdetails");

    return response.data.payload;
  }
  // console.log(getUser)

  useEffect(() => {
    (async function () {
      const displayUser = await getUser();
      setPerson(displayUser);
    })();
  }, []);
  console.log(person, "person");

  return (
    <div>
      <UserNav username={username.username} />

      {person.map((user) => {
        return (
          <Profile>
            <div>
              <UserPicture src={ProfilePicture} alt="" />
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
        );
      })}
    </div>
  );
};

export default UserDashBoard;

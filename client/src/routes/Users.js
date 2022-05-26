import React, { useEffect, useState } from "react";
import UserRow from "../components/UserRow";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  TextField,
} from "@mui/material/";
import { TableHead } from "@mui/material";

function Users() {
  // State Set Up
  const [users, setUsers] = useState([{}]);

  // Form Set Up
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [location, setLocation] = useState("");

  function onChangeEmail(event) {
    setEmail(event.target.value);
  }

  function onChangeBirthday(event) {
    setBirthday(event.target.value);
  }

  function onChangeLocation(event) {
    setLocation(event.target.value);
  }

  // API SET UP
  const getUsers = () => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .then(console.log("getUsers called"));
  };

  useEffect(() => {
    console.log("IN EFFECT");
    getUsers();
  }, []);

  const postUser = async (newUser) => {
    //'https://dry-bayou-57145.herokuapp.com/users
    fetch("https://dry-bayou-57145.herokuapp.com/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then(() => getUsers());
  };



  const removeUser = (id) =>
    //'https://dry-bayou-57145.herokuapp.com/users/id
    fetch(`https://dry-bayou-57145.herokuapp.com/users/${id}`, {
      method: "DELETE",
    });

  // Add SQL Insert
  function createUser(event) {
    event.preventDefault();
    let newUser = {
      userEmail: email,
      userBirthday: birthday,
      userLocation: location,
    };
    // Create API Call and update User if successful
    postUser(newUser);
  }

  // Add SQL Delete
  function deleteUser(id) {
    removeUser(id);
    const allUsers = [...users];
    let updatedUsers = allUsers.filter((user) => user.userID !== id);
    setUsers(updatedUsers);
  }

  return (
    <div>
      <h1>User</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              console.log("Map function called!", user);
              return <UserRow data={user} deleteUser={deleteUser} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <form onSubmit={createUser}>
        <h2>Create a new User</h2>
        <label htmlFor="userEmail">Email:</label>
        <input
          type="email"
          id="userEmail"
          name="userEmail"
          onChange={(e) => onChangeEmail(e)}
        />
        <br />
        <label htmlFor="userBirthday">Enter a birthday:</label>
        <input
          type="date"
          id="userBirthday"
          name="userBirthday"
          onChange={(e) => onChangeBirthday(e)}
        />
        <br />
        <label htmlFor="userLocation">Enter a Location</label>
        <input
          type="text"
          id="userLocation"
          name="userLocation"
          onChange={(e) => onChangeLocation(e)}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Users;

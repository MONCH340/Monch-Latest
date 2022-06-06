import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import UserRow from "../components/UserRow";
import Button from 'react-bootstrap/Button'
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
} from "@mui/material/";
import { TableHead } from "@mui/material";

function Users() {
  // State Set Up
  const [users, setUsers] = useState([]);

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

  // Get all users
  const getUsers = () => {
    fetch("https://dry-bayou-57145.herokuapp.com/backend/users/")
      .then((response) => response.json())
      .then((data) => setUsers(data))
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Create a new user
  const postUser = async (newUser) => {
    fetch("https://dry-bayou-57145.herokuapp.com/backend/users/", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then(() => getUsers());
  };

  // Delete a user
  const removeUser = (id) =>
    fetch(`https://dry-bayou-57145.herokuapp.com/backend/users/${id}`, {
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
      <Form onSubmit={createUser}>
        <h2>Create a new User</h2>
        <Form.Group>
        <Form.Label htmlFor="userEmail">Email address</Form.Label>
        <Form.Control
          type="email"
          required
          id="userEmail"
          name="userEmail"
          onChange={(e) => onChangeEmail(e)}
        />
        </Form.Group>
        <Form.Group>
        <Form.Label htmlFor="userBirthday">Enter a birthday:</Form.Label>
        <Form.Control
          type="date"
          required
          id="userBirthday"
          name="userBirthday"
          onChange={(e) => onChangeBirthday(e)}
        />
        </Form.Group>
        <Form.Group>
        <Form.Label htmlFor="userLocation">Enter a Location</Form.Label>
        <Form.Control
          type="text"
          required
          id="userLocation"
          name="userLocation"
          onChange={(e) => onChangeLocation(e)}
        />
        </Form.Group>
        <Button variant="primary" type="submit" value="Submit">Submit </Button>
      </Form>
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
              return <UserRow data={user} deleteUser={deleteUser} key={user.userID}/>;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Users;

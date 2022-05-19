import React, {useEffect, useState} from 'react';
import { sample_users } from "../sample_data/users"
import UserRow from "../components/UserRow"
import NavBar from "../components/NavBar";

  /* 
  1. Create Sample Data X
  2. Create Table X
  3. Create row components X 
  4. Create form for insert X
  5. create form for delete -----
  6. create query for insert/delete ----- 

  QUERIES NEEDED:
  GET ALL USERS
  DELETE A USER
  ADD A USER
  */


function Users() {
  // State Set Up
  const [users, setUsers] = useState(sample_users)

  // Add SQL Query

  // Form Set Up
  const [email, setEmail] = useState("")
  const [birthday, setBirthday] = useState("")
  const [location, setLocation] = useState("")

  const fetchUsers = () => {
    fetch('https://dry-bayou-57145.herokuapp.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
  }

  const postUser = (newUser) => {
    //'https://dry-bayou-57145.herokuapp.com/users
    fetch("http://localhost:5000/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser)
    })
  }


  function onChangeEmail(event) {
    setEmail(event.target.value)
  }

  function onChangeBirthday(event) {
    setBirthday(event.target.value)
  }

  function onChangeLocation(event) {
    setLocation(event.target.value)
  }
  // Function Set Up

  // Add SQL Insert
  function createUser(event) {
    event.preventDefault()
    let newUser = { 
      userEmail: email, 
      userBirthday: birthday,
      userLocation: location
    }
    //'https://dry-bayou-57145.herokuapp.com/users
    postUser(newUser)
    console.log(newUser)
  }

  // Add SQL Delete
  function deleteUser(id) {
    alert(`Deleting Review ${id}`)
    const updatedUsers = [... users]
    updatedUsers.filter(user => user["userID"] !== id)
    console.log(updatedUsers)
  }

  return (
    <div>
      <h1>User</h1>
      <NavBar></NavBar>
      <h2>User Table</h2>
      <tbody>
        <table>
          <tr>
            <th>userID</th>
            <th>userEmail</th>
            <th>userBirthday</th>
            <th>userLocation</th>
            <th>delete</th>
          </tr>
          {users.map((user) => {
            return <UserRow data={user} deleteUser={deleteUser}/>
          })}
        </table>
      </tbody>
      <form onSubmit={createUser}>
        <h2>Create a new User</h2>
        <label htmlFor="userEmail">Email:</label>
        <input type="email" id="userEmail" name="userEmail" onChange={e => onChangeEmail(e)}/>
        <br/>
        <label htmlFor="userBirthday">Enter a birthday:</label>
        <input type="date" id="userBirthday" name="userBirthday" onChange={e => onChangeBirthday(e)}/>
        <br/>
        <label htmlFor="userLocation">Enter a Location</label>
        <input type="text" id="userLocation" name="userLocation" onChange={e => onChangeLocation(e)}/> 
        <br/>
        <input type="submit" value="Submit" />
        </form>
    </div>
  );
}

export default Users;

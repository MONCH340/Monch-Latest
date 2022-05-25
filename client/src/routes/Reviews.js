import React, {useEffect, useState} from 'react';
import { sample_users } from "../sample_data/users"
import ReviewRow from "../components/ReviewRow"
import Button from '@mui/material/Button';
import { sample_reviews } from '../sample_data/reviews';
import {Table, TableCell, TableRow, TableBody, TableContainer, TextField } from '@mui/material/';
import { TableHead  } from '@mui/material';
import { sample_restaurants } from '../sample_data/restaurants';


function Reviews() {
    // State Set Up
    const [reviews, setReviews] = useState(sample_reviews)
    const [users, setUsers] = useState(sample_users)
    const [restaurants, setRestaurants] = useState(sample_restaurants)

    
    // Add SQL Query 
    // Form Set Up
    const [userID, setuserID] = useState("")
    const [restaurantID, setRestaurantID] = useState("")
    const [reviewContent, setReviewContent] = useState("")
    const [reviewDate, setReviewDate] = useState("")
    const [reviewStar, setReviewStar] = useState(1)

    function createReview(event) {
        event.preventDefault()
        const newReview = {
            userID,
            restaurantID,
            reviewContent,
            reviewStar,
            reviewDate,
        }
        console.log(newReview)
    }

    function onChangeUserID(event) {
        setuserID(event.target.value)
    }

    function onChangeRestaurantID(event) {
        setRestaurantID(event.target.value)
    }

    function onChangeReviewContent(event) {
        setReviewContent(event.target.value)
    }

    function onChangeDate(event) {
        setReviewDate(event.target.value)
    }

    function onChangeReviewStar(event) {
        setReviewStar(event.target.value)
    }


    // Add SQL Delete
    function deleteReview(id) {
        alert(`Deleting Review ${id}`)
    }

    // Search SQL
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetch(`http://localhost:5000/reviews/${search}`)
        .then(response => response.json())
        .then(data => setReviews(data))
    }, [search])


    function searchReview(event) {
        event.preventDefault()
        alert(`Searching for term: ${search}`)
        fetch(`http://localhost:5000/reviews/${search}`)
        .then(response => response.json())
        .then(data => setReviews(data))
    }

    function onChangeSearch(event) {
        setSearch(event.target.value)
    }

  // API SET UP
  // https://dry-bayou-57145.herokuapp.com/reviews
  const getReviews = () => {
    fetch('http://localhost:5000/reviews')
      .then(response => response.json())
      .then(data => setReviews(data))
  }

  const getUsers = () => {
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
  }
  
  const getRestaurants = () => {
    fetch('http://localhost:5000/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
}
  useEffect(() => {
    getReviews()
    getUsers()
  }, [])
  

  // Return Data
    return (
        <div>
            <h1>Review</h1>
            <h3>Search for a Restaurant:</h3>
            <br />
            <TextField  size="small" variant="outlined" id="search" onChange={e => onChangeSearch(e)}/>
        <br/>
        <tbody>
        <TableContainer >
            <Table>
            <TableHead>
            <TableRow>
                <TableCell>Review ID</TableCell>
                <TableCell>Restaurant</TableCell>
                <TableCell>Review</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>User Email</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Remove</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {reviews.map((review) => {
                return <ReviewRow data={review} deleteReview={deleteReview} />
            })}
            </TableBody>
            </Table>
            </TableContainer>
        </tbody>
        <br/>
        <form onSubmit={createReview}>
            <h2>Create a Review</h2>
            <label htmlFor="userEmail">User Email</label>
                <select id="userEmail" name="userEmail" onChange={onChangeUserID} required>
                    <option disabled selected value="" > -- select an option -- </option>
                    {users.map((user) => {
                        return <option value={user.id}>{user.userEmail}</option>
                    })}
                </select>
            <br/>
            <br/>
            <label htmlFor="restaurantName">Restaurant Name</label>
                <select id="restaurantName" name="restaurantName" onChange={onChangeRestaurantID}>
                <option disabled selected value=""> -- select an option -- </option>
                {restaurants.map((restaurant) => {
                        return <option value={restaurant.restaurantID}>{restaurant.restaurantName}</option>
                    })}
                </select>
            <br/>
            <br/>
            <label htmlFor="reviewContent">Review Content</label>
            <br/>
            <textarea id="reviewContent" name="reviewContent" rows="10" cols="50" onChange={onChangeReviewContent} required/>
            <br/>
            <label htmlFor="reviewStar">reviewStar</label>
                <select id="reviewStar" name="reviewStar" onChange={onChangeReviewStar} required>
                {[1,2,3,4,5].map((rating) => {
                        return <option value={rating}>{rating}</option>
                })}
                </select>
            <br/>
            <label htmlFor="date">Date of Visit</label>
            <input type="date" name="date" id="date" onChange={onChangeDate} required/>
            <br/>
            <Button type="submit" variant="outlined">Submit</Button>
        </form>
        </div>
    
    );
}

export default Reviews
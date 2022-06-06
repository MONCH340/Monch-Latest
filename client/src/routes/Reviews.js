import React, {useEffect, useState} from 'react';
import ReviewRow from "../components/ReviewRow"
import Button from '@mui/material/Button';
import {Table, TableCell, TableRow, TableBody, TableContainer } from '@mui/material/';
import { TableHead  } from '@mui/material';
import Form from 'react-bootstrap/Form'

function Reviews() {
    // State Set Up
    const [reviews, setReviews] = useState([])
    const [users, setUsers] = useState([])
    const [restaurants, setRestaurants] = useState([])

    
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
        console.log(reviewDate)
        postReview(newReview)
    }

    function onChangeUserID(event) {
        console.log(event.target.value)
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


    // SQL Delete
    function deleteReview(id) {
        removeReview(id)
    }

    const removeReview = (id) =>
    fetch(`https://dry-bayou-57145.herokuapp.com/backend/reviews/${id}`, {
      method: "DELETE",
    }).then((response) => response.json())
    .then(() => getReviews());

    // Search SQL
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetch(`https://dry-bayou-57145.herokuapp.com/backend/reviews/${search}`)
        .then(response => response.json())
        .then(data => setReviews(data))
    }, [search])


    function onChangeSearch(event) {
        setSearch(event.target.value)
    }

    // Get all Reviews
  const getReviews = () => {
    fetch('https://dry-bayou-57145.herokuapp.com/backend/reviews')
      .then(response => response.json())
      .then(data => setReviews(data))
  }

  // Get all users
  const getUsers = () => {
    fetch('https://dry-bayou-57145.herokuapp.com/backend/users')
      .then(response => response.json())
      .then(data => setUsers(data))
  }
  
  // Get all restaurant
  const getRestaurants = () => {
    fetch('https://dry-bayou-57145.herokuapp.com/backend/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
}
  useEffect(() => {
    getRestaurants()
    getReviews()
    getUsers()
  }, [])
  
  // Create a Review
  const postReview = async (newReview) => {
    fetch("https://dry-bayou-57145.herokuapp.com/backend/reviews", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview)
      })
      .then(response => response.json())
      .then(data => getReviews())
}

  // Return Data
    return (
        <div>
            <h1>Review</h1>
        <br/>
        <Form onSubmit={createReview}>
            <h2>Create a Review</h2>
            <Form.Group>
            <Form.Label htmlFor="userEmail">User Email</Form.Label>
            <Form.Select id="userEmail" name="userEmail" onChange={onChangeUserID} required>
                    <option> -- select an option -- </option>
                    {users.map((user) => {
                        return <option value={user.userID} key={user.userID}>{user.userEmail}</option>
                    })}
            </Form.Select>
            </Form.Group>
            <Form.Group>
            <Form.Label htmlFor="restaurantName">Restaurant Name</Form.Label>
            <Form.Select id="restaurantName" name="restaurantName" onChange={onChangeRestaurantID}>
                <option> -- select an option -- </option>
                {restaurants.map((restaurant) => {
                        return <option value={restaurant.restaurantID} key={restaurant.restaurantID}>{restaurant.restaurantName}</option>
                    })}
            </Form.Select>
            </Form.Group>
            <Form.Group>
            <Form.Label htmlFor="reviewContent">Review Content</Form.Label>
            <Form.Control as="textarea" rows={3} id="reviewContent" name="reviewContent" onChange={onChangeReviewContent} required/>
            </Form.Group>
            <Form.Group>
            <Form.Label htmlFor="reviewStar">reviewStar</Form.Label>
                <Form.Select id="reviewStar" name="reviewStar" onChange={onChangeReviewStar} required>
                {[1,2,3,4,5].map((rating) => {
                        return <option value={rating} key={rating}>{rating}</option>
                })}
                </Form.Select>
            </Form.Group>
            <Form.Group>
            <Form.Label htmlFor="date">Date of Visit</Form.Label>
            <Form.Control type="date" name="date" id="date" onChange={onChangeDate} required/>
            </Form.Group>
            <Button variant="primary" type="submit" value="Submit">Submit</Button>
        </Form>
        <br/>
        <h2>Search for a Restaurant:</h2>
            <br />
            <Form.Control size="small" variant="outlined" id="search" onChange={e => onChangeSearch(e)}/>
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
                return <ReviewRow data={review} deleteReview={deleteReview} key={review.reviewID}/>
            })}
            </TableBody>
            </Table>
            </TableContainer>
        </div>
    
    );
}

export default Reviews
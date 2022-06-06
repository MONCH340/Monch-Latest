import React, {useEffect, useState} from 'react';
import RestaurantRow from "../components/RestaurantRow"
import RestaurantSelect from "../components/RestaurantSelect"
import CouponSelect from "../components/CouponSelect"
import {Table, TableCell, TableRow, TableBody, TableContainer, TextField } from '@mui/material/';
import { TableHead  } from '@mui/material';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Restaurants() {
    const [restaurants, setRestaurants] = useState([])
    const [coupons, setCoupons] = useState([])

    function deleteRestaurant (id) {
        removeRestaurant(id)
    }

    const removeRestaurant = (id) =>
    //'https://dry-bayou-57145.herokuapp.com/users/id
    fetch(`https://dry-bayou-57145.herokuapp.com/backend/restaurants/${id}`, {
      method: "DELETE",
    }).then((response) => response.json())
    .then(() => getRestaurants());


    const getRestaurants = () => {
        fetch('https://dry-bayou-57145.herokuapp.com/backend/restaurants')
          .then(response => response.json())
          .then(data => setRestaurants(data))
    }

    function readCoupons() {
        fetch(`https://dry-bayou-57145.herokuapp.com/backend/coupons`)
          .then((response) => response.json())
          .then((data) => setCoupons(data));
        }

    useEffect(() => {
        getRestaurants()
        readCoupons()
    }, [])

    // Create Form Set Up
    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantAddress, setRestaurantAddress] = useState("")
    const [restaurantCity, setRestaurantCity] = useState("")
    const [restaurantPriceRange, setRestaurantPriceRange] = useState(1)
    const [restaurantHasNutritionInfo, setRestaurantHasNutritionInfo] = useState("TRUE")
   
    function onChangeRestaurantName(event) {
        setRestaurantName(event.target.value)
    }

    function onChangeRestaurantAddress(event) {
        setRestaurantAddress(event.target.value)
    }    
    
    function onChangeRestaurantID(event) {
        setRestaurantID(event.target.value)
    }

    function onChangeRestaurantCity(event) {
        setRestaurantCity(event.target.value)
    }

    function onChangeRestaurantPriceRange(event) {
        setRestaurantPriceRange(event.target.value)
    }

    function onChangeRestaurantHasNutritionInfo(event) {
        setRestaurantHasNutritionInfo(event.target.value)
    }

    function createRestaurant(event) {
        event.preventDefault()
        let newRestaurant = { 
            restaurantName,
            restaurantAddress,
            restaurantCity,
            restaurantPriceRange,
            restaurantHasNutritionInfo,
          }
          postRestaurant(newRestaurant)
        // Create API Call and update User if successful
    }

    const postRestaurant = async (newRestaurant) => {
        fetch("https://dry-bayou-57145.herokuapp.com/backend/restaurants", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRestaurant)
          })
          .then(response => response.json())
          .then(data => getRestaurants())
    }

    // PUT Form Set Up
    const [couponID, setCouponID] = useState("Null")
    const [restaurantID, setRestaurantID] = useState()
   
    function onChangeCouponID(event) {
        setCouponID(event.target.value)
    }

    function onChangeRestaurantID(event) {
        setRestaurantID(event.target.value)
    }

    function addCoupon(event) {
        event.preventDefault()
        putRestaurant(restaurantID, couponID)
    }

    const putRestaurant = async (id, couponid) => {
        fetch(`https://dry-bayou-57145.herokuapp.com/backend/restaurants/${id}/coupon/${couponid}`, {
            method: 'PUT'
        })
        .then(response => response.json())
        .then(data => getRestaurants())

    }

    return (
        <div>
        <h1>Restaurant</h1>
        <h2>Create a Restaurant</h2>
        <Form onSubmit={createRestaurant}>
            <Form.Label htmlFor="restaurantName">Enter a restaurantName</Form.Label>
            <Form.Control required type="text" name="restaurantName" id="restaurantName" onChange={e => onChangeRestaurantName(e)}/>
            <Form.Label htmlFor="restaurantAddress">Enter a restaurantAddress</Form.Label>
            <Form.Control required type="text" name="restaurantAddress" id="restaurantAddress" onChange={e => onChangeRestaurantAddress(e)}/>

            <Form.Label htmlFor="City">Enter a City</Form.Label>
            <Form.Control required type="text" name="restaurantCity" id="restaurantCity" onChange={e => onChangeRestaurantCity(e)}/>

            <Form.Label htmlFor="restaurantPriceRange">Enter a price Range</Form.Label>
            <Form.Select required name="restaurantPriceRange" id="restaurantPriceRange" onChange={e => onChangeRestaurantPriceRange(e)}>
                <option value="1">$0-$15</option>
                <option value="2">$16-$30</option>
                <option value="3">$31-$50</option>
                <option value="4">$51-$100</option>
                <option value="5">$100+</option>
            </Form.Select>

            <Form.Label htmlFor="restaurantHasNutritionInfo">Does it have nutrition information</Form.Label>
            <Form.Select required name="restaurantHasNutritionInfo" id="restaurantHasNutritionInfo" onChange={e => onChangeRestaurantHasNutritionInfo(e)}>
                <option value="TRUE">TRUE</option>
                <option value="FALSE">FALSE</option>
            </Form.Select>
            <Button type="submit" variant="primary">Submit</Button>
        </Form>
        <br/>

        <h2>Update Deals</h2>
        <Form onSubmit={addCoupon}>
        <Form.Label htmlFor="restaurantID">Select a Restaurant</Form.Label>

        <Form.Select name="restaurantID" id="restaurantID" onChange={onChangeRestaurantID} required>
            <option disabled selected value="" > -- select an option -- </option>
            {restaurants.map((restaurant) => {
                    return <RestaurantSelect data={restaurant} />
            })}
        </Form.Select>
        <br/>
        <Form.Label htmlFor='couponID'>Enter a deal</Form.Label>
        <Form.Select name="couponID" id="couponID" onChange={onChangeCouponID} required>
            <option value="NULL" > None (Null)</option>
            {coupons.map((coupon) => {
                    return <CouponSelect data={coupon} />
            })}
        </Form.Select>
        <Button type="submit" variant="primary">Submit</Button>
        </Form>
        <TableContainer>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Restaurant</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Price Range</TableCell>
                <TableCell>Has Nutrition Info</TableCell>
                <TableCell>Deals</TableCell>
                <TableCell>Remove</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {restaurants.map((restaurant) => {
                return <RestaurantRow data={restaurant} deleteRestaurants={deleteRestaurant} />
            })}
            </TableBody>
        </Table>
        </TableContainer>
        <br />
        </div>
    );
}

export default Restaurants
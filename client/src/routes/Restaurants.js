import React, {useState} from 'react';
import NavBar from "../components/NavBar";
import { sample_restaurants } from "../sample_data/restaurants"
import { sample_coupons } from "../sample_data/coupons"
import RestaurantRow from "../components/RestaurantRow"
import RestaurantSelect from "../components/RestaurantSelect"
import CouponSelect from "../components/CouponSelect"
    /* 
    1. Create Sample Data 
    2. Create Table 
    3. Create row components 
    4. Create form for insert
    5. create form for delete 
    6. create query for insert/delete

    QUERIES NEEDED:
    GET ALL RESTAURANTS - inner join with coupon
    DELETE A RESTAURANT
    */

function Restaurants() {
    const [restaurants, setRestaurants] = useState(sample_restaurants)
    const [coupons, setCoupons] = useState(sample_coupons)
    function deleteRestaurant () {
        alert("Deleting Store")
    }
    return (
        <div>
        <h1>Restaurant</h1>
        <h2>Restaurant Table</h2>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Price Range</th>
                <th>Has Nutrition Info</th>
                <th>Deals</th>
            </tr>
            {restaurants.map((restaurant) => {
                return <RestaurantRow data={restaurant} deleteRestaurants={deleteRestaurant} />
            })}
        </table>
        <form>
            <h2>Create a Restaurant</h2>
            <label htmlFor="restaurantName">Enter a restaurantName</label>
            <input type="text" name="restaurantName" id="restaurantName" />
            <br/>
            <label htmlFor="restaurantAddress">Enter a restaurantAddress</label>
            <input type="text" name="restaurantAddress" id="restaurantAddress"/>
            <br/>
            <label htmlFor="City">Enter a City</label>
            <input type="text" name="restaurantCity" id="restaurantCity" />
            <br/>
            <label htmlFor="restaurantPriceRange">Enter a price Range</label>
            <select name="restaurantPriceRange" id="restaurantPriceRange">
                <option value="1">$0-$10</option>
                <option value="2">$11-$20</option>
                <option value="3">$20-$30</option>
                <option value="4">$40-$50</option>
                <option value="5">$50+</option>
            </select>
            <br/>
            <label htmlFor="restaurantHasNutritionInfo">Does it have nutrition information</label>
            <select name="restaurantHasNutritionInfo" id="restaurantHasNutritionInfo">
                <option value="TRUE">TRUE</option>
                <option value="FALSE">FALSE</option>
            </select>
            <br/>
            <button>Submit</button>
        </form>
        <br/>

        <h2>Update Deals</h2>
        <form>
        <label htmlFor="restaurantID">Select a Restaurant</label>
        <select name="restaurantID" id="restaurantID">
        {restaurants.map((restaurant) => {
                return <RestaurantSelect data={restaurant} />
            })}
        </select>
        <br/>
        <label htmlFor='couponID'>Enter a deal</label>
        <select name="couponID" id="couponID">
        <option value="null">None (Null)</option>
        {coupons.map((coupon) => {
                return <CouponSelect data={coupon} />
            })}
        </select>
        <button>Submit</button>
        </form>
        </div>
    );
}

export default Restaurants
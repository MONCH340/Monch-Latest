var express = require("express");
var router = express.Router();
var database = require('../database')

/// Routes for Restaurants Page

// Gets all users
router.get("/", async (req, res) => {
  let query_data = 'select *, IFNULL(couponDetails, "None") as couponDetails from restaurants\
  left join COUPONS ON restaurants.couponID = coupons.couponID;';
  try {
    const results = await database.promise().query(query_data)
    // Return all data in json format
    res.status(201).send(results[0])
  } catch (err) {
    console.log(err)
    res.status(400).send({
      error: err.message
    })
  }
});

// Handle a post request
router.post("/", async (req, res) => {
  const {restaurantName, restaurantAddress, restaurantCity, restaurantPriceRange, restaurantHasNutritionInfo} = req.body
  let query_data = `INSERT INTO Restaurants (restaurantName,restaurantAddress,restaurantCity,restaurantPriceRange, restaurantHasNutritionInfo)\
  VALUES ("${restaurantName}", "${restaurantAddress}", "${restaurantCity}", ${restaurantPriceRange}, ${restaurantHasNutritionInfo})`
  try {
    const results = await database.promise().query(query_data)
    // Return all data in json format
    res.status(201).send(results[0])
  } catch (err) {
    console.log(err)
    res.status(400).send({
      error: err.message
    })
  }
});

// Handles a put request 
router.put("/:id/coupon/:couponid", async (req, res) => {
  const {id, couponid} = req.params
  let query_data = `UPDATE Restaurants SET couponID=${couponid} WHERE restaurantID=${id}`
  try {
    const results = await database.promise().query(query_data)
    // Return all data in json format
    res.status(201).send(results[0])
  } catch (err) {
    console.log(err)
    res.status(400).send({
      error: err.message
    })
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  let query_data = `DELETE FROM restaurants WHERE restaurantID = ${id}`;
  try {
    const results = await database.promise().query(query_data)
    // no rows were deleted - need better handlers
    if (results[0].affectedRows === 0) {
      res.status(201).send({
        userID: 10000
      })
    } else {
    res.status(201).send({
      userID:id
    })}
  } catch (err) {
    console.log(err)
    res.status(400).send({
      error: err.message
  })}
});

module.exports = router;

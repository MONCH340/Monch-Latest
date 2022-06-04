const express = require("express");
const router = express.Router();
const database = require('../database');

/// Routes for Review Page

// Gets all Review
router.get("/", async (req, res) => {
  let query_data = "select * from reviews \
  INNER JOIN users on users.userID = reviews.userID \
  INNER JOIN restaurants on restaurants.restaurantID = reviews.restaurantID;"
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

// Gets a Review
router.get("/:search", async (req, res) => {
  const { search } = req.params
  let query_data = `select * from reviews \
  INNER JOIN users on users.userID = reviews.userID \
  INNER JOIN restaurants on restaurants.restaurantID = reviews.restaurantID \
  WHERE restaurantName like "%${search}%";`
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
  const {
    userID,
    restaurantID,
    reviewContent,
    reviewStar,
    reviewDate,
  } = req.body
  console.log(reviewDate)
  let query_data = `INSERT INTO Reviews (userID, restaurantID, reviewContent, reviewStar, reviewDate)\
  VALUES (${userID}, ${restaurantID}, "${reviewContent}", ${reviewStar}, "${reviewDate}")`
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
  let query_data = `DELETE FROM reviews WHERE reviewid = ${id}`;
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

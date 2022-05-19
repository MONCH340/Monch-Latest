var express = require("express");
var router = express.Router();
var database = require('../database')
/// Routes for Users Page

// Gets all users
router.get("/", async (req, res) => {
  let query_data = "SELECT * FROM USERS"
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

// Create a User
router.post("/", async (req, res) => {
    let {userEmail, userBirthday, userLocation} = req.body
    let query_data = `INSERT INTO USERS (userEmail, userBirthday, userLocation) VALUES ("${userEmail}", "${userBirthday}", "${userLocation}")`
    try {
      const results = await database.promise().query(query_data)
      // Get back new ID that was added
      let newID = results[0].insertId
      res.status(201).send({
        userID:newID,
        userEmail,
        userBirthday,
        userLocation,
      })
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
  let query_data = `DELETE FROM users WHERE userid = ${id}`;
  try {
    const results = await database.promise().query(query_data)
    // no rows were deleted - need better handlers
    if (results[0].affectedRows == 0) {
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

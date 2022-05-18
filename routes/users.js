var express = require("express");
var router = express.Router();
var database = require('../database')
/// Routes for Users Page

// Gets all users
router.get("/", async (req, res) => {
  let query_data = "Select * from users"
  try {
    const results = await database.promise().query(query_data)
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

})
// Delete a user
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  let query_data = `DELETE FROM users WHERE userid = ${id}`;
  try {
    const results = await database.promise().query(query_data)
    res.status(201).send(results[0])
  } catch (err) {
    console.log(err)
    res.status(400).send({
      error: err.message
  })}
});

module.exports = router;

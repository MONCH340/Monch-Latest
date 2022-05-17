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
  } catch (err)
  {
    console.log(err)
    res.status(400).send({
      error: err.message
    })
  }
});

// Delete a user
router.delete("/:id", (req, res) => {
  res.json({test: "Deleting a Users"});
});

module.exports = router;

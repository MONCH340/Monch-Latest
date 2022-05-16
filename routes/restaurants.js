var express = require("express");
var router = express.Router();

/// Routes for Restaurants Page

// Gets all users
router.get("/", (req, res) => {
  res.send("Getting all Restaurants");
});

// Delete a user
router.delete("/:id", (req, res) => {
  res.send("Deleting an ID");
});

module.exports = router;

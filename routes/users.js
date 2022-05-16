var express = require("Express");
var router = express.Router();

/// Routes for Users Page

// Gets all users
router.get("/", (req, res) => {
  res.send("Getting all Users");
});

// Delete a user
router.delete("/:id", (req, res) => {
  res.send("Deleting an ID");
});

module.exports = router;

var express = require("Express");
var router = express.Router();

/// Routes for Review Page

// Gets all Review
router.get("/", (req, res) => {
  res.send("Getting all Review");
});

// Delete a user
router.delete("/:id", (req, res) => {
  res.send("Deleting a Review");
});

module.exports = router;

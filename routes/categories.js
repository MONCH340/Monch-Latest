var express = require("express");
var router = express.Router();
var database = require("../database");
const { query } = require("express");

/// Routes for categories Page

// Gets all categories
router.get("/", async (req, res) => {
  let query_data = "SELECT * FROM CATEGORIES";
  try {
    const results = await database.promise().query(query_data);
    console.log(results);
    res.status(201).send(results[0]);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: err.message,
    });
  }
});

// Delete a category
router.delete("/:id", async (req, res) => {
  console.log(req);
  const { id } = req.params;
  let query_data = `DELETE FROM categories WHERE categoryid = ${id}`;
  try {
    const results = await database.promise().query(query_data);
    if (results[0].affectedRows == 0) {
      console.log("no results");
      res.status(400).send({});
    } else {
      res.status(201).send({
        categoryID: id,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  let { categoryName } = req.body;
  let query_data = `INSERT INTO categories (categoryName) VALUES ("${categoryName}")`;
  try {
    const results = await database.promise().query(query_data);
    // Get back new ID that was added
    let newID = results[0].insertId;
    res.status(201).send({
      categoryID: newID,
      categoryName,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: err.message,
    });
  }
});

module.exports = router;

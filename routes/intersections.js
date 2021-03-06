const express = require("express");
const router = express.Router();
const db = require("../database");
const database = require("../database");

// get all intersections
router.get("/", async (req, res) => {
  let query =
    "SELECT * FROM restaurantsWithCategories\n" +
    "INNER JOIN Restaurants ON Restaurants.restaurantID = restaurantsWithCategories.restaurantID\n" +
    "INNER JOIN Categories ON categories.categoryID = restaurantsWithCategories.categoryID;";
  console.log(query)
  try {
    const results = await db.promise().query(query);
    res.status(201).send(results[0]);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

// delete a intersection
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`deleting ${id}`);
  let query = `DELETE FROM restaurantsWithCategories WHERE restaurantsWithCategoriesID = ${id}`;
  console.log(query)
  try {
    const results = await db.promise().query(query);
    console.log(results);
    if (results[0].affectedRows === 0) {
      res.status(400).send({});
    } else {
      res.status(201).send({ restaurantsWithCategoriesID: id });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: err.message,
    });
  }
});

// update a intersection
router.put(
  "/category/:categoryID/restaurant/:restaurantID",
  async (req, res) => {
    const { categoryID, restaurantID } = req.params;
    let query = `UPDATE restaurantsWithCategories SET categoryID = ${categoryID} WHERE restaurantID = ${restaurantID}`;
    console.log(query)
    try {
      const results = await db.promise().query(query);
      res.status(201).send(results[0]);
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: err.message,
      });
    }
  }
);

// create an intersection
router.post("/", async(req, res) => {
  const {categoryID, restaurantID} = req.body
  let query = `INSERT INTO restaurantsWithCategories(categoryID, restaurantID) VALUES (${categoryID}, ${restaurantID})`
  console.log(query)
  try {
    const results = await database.promise().query(query)
    res.status(201).send(results[0])
  }
  catch (err){
    console.log(err)
    res.status(400).send({
      error: err.message})
  }

})
module.exports = router;

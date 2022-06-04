const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", async (req, res) => {
  let query = "SELECT * FROM restaurantswithcategories\n" +
      "INNER JOIN Restaurants ON Restaurants.restaurantID = restaurantswithcategories.restaurantID\n" +
      "INNER JOIN Categories on categories.categoryID = restaurantswithcategories.categoryID;";
  try {
    const results = await db.promise().query(query);
    console.log(results);
    console.log(results[0]);
    console.log(results[1]);
    res.status(201).send(results[0]);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});


router.delete("/:id", async (req, res) => {
  const {id} = req.params;
  console.log (`deleting ${id}`)
  let query = `DELETE FROM restaurantswithcategories WHERE restaurantsWithCategoriesID = ${id}`
  try{
    const results = await db.promise().query(query);
    console.log(results);
    if (results[0].affectedRows == 0){
      res.status(400).send({})
    } else {
      res.status(201).send({restaurantsWithCategoriesID: id})
    }
  } catch (err){
    console.log(err);
    res.status(400).send({
      error: err.message,
    })

  }
})


// router.post("/", async (req, res) => {
//
// })

module.exports = router;
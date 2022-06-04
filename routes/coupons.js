const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", async (req, res) => {
  let query = "SELECT * FROM Coupons";
  try {
    const results = await db.promise().query(query);
    res.status(201).send(results[0]);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`deleting ${id}`);

  // Update all restaurants that contains this coupon
  let query1 = `UPDATE Restaurants SET couponID = NULL WHERE couponID = ${id}`

  // Delete the Query
  let query = `DELETE FROM coupons WHERE couponID = ${id}`;
  
  try {
    const temp = await db.promise().query(query1)
    const results = await db.promise().query(query);
    console.log(results);
    if (results[0].affectedRows == 0) {
      res.status(400).send({});
    } else {
      res.status(201).send({ couponID: id });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  let { couponDetails } = req.body;
  let query = `INSERT INTO coupons (couponDetails) VALUES ("${couponDetails}")`;
  try {
    const results = await db.promise().query(query);
    let newID = results[0].insertId;
    res.status(201).send({
      couponID: newID,
      couponDetails,
    });
  } catch (err) {
    console.log(err);
    res.stats(400).send({
      error: err.message,
    });
  }
});
module.exports = router;

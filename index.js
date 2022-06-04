// App Set Up
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(express.json());
app.use(cors())

// SQL Connection Set Up and Test
const mysql = require('mysql2');
const config = require('./config')
var connection = mysql.createPool(config.db);


connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});


// Path for static files
const path = require("path");

// Morgan for logging
var morgan = require("morgan");
app.use(morgan(":method :url :status"));

// Router Handling
const users = require("./routes/users");
const reviews = require("./routes/reviews");
const categories = require("./routes/categories");
const restaurants = require("./routes/restaurants");
const coupons = require("./routes/coupons");
const intersections = require("./routes/intersections")

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
//

app.get("/", (req, res) => {
  res.send("This is the home route");
});

app.use("/backend/users", users);
app.use("/backend/reviews", reviews);
app.use("/backend/categories", categories);
app.use("/backend/restaurants", restaurants);
app.use("/backend/coupons", coupons);
app.use("/backend/intersections", intersections);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Port set up
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

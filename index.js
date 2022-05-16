const express = require("express");
const app = express();
const port = 5000;

// SQL set up
var mysql      = require('mysql');
var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();

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

// Router Handling


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/", (req, res) => {
  res.send("This is the home route");
});

app.use("/users", users);
app.use("/reviews", reviews);
app.use("/categories", categories);
app.use("/restaurants", restaurants);

// Port set up
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`);
});

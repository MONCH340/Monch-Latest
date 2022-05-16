const express = require("express");
const app = express();
const port = 3000;

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

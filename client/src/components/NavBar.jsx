import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <Link to="/"> Home </Link>
      <br />
      <Link to="/users">Users</Link>
      <br />
      <Link to="/reviews">Reviews</Link>
      <br />
      <Link to="/restaurants">Restaurants</Link>
      <br />
      <Link to="/categories">Categories</Link>
      <br />
      <Link to="/coupons">Coupons</Link>
      <br />
      <Link to="/categories_restaurants">Restaurant-Category Intersection</Link>
    </nav>
  );
}

export default NavBar;

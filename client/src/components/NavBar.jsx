import React from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
      <Link to="/"> MONCH </Link>
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
      </Container>
    </Navbar>
  );
}

export default NavBar;

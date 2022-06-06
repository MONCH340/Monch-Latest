import React from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
      <Link class="links" to="/home"> MONCH </Link>
      <br />
      <Link class="links"  to="/users">Users</Link>
      <br />
      <Link class="links"  to="/reviews">Reviews</Link>
      <br />
      <Link class="links"  to="/restaurants">Restaurants</Link>
      <br />
      <Link class="links"  to="/categories">Categories</Link>
      <br />
      <Link class="links"  to="/coupons">Coupons</Link>
      <br />
      <Link class="links" to="/categories_restaurants">Restaurant-Category Intersection</Link>
      </Container>
    </Navbar>
  );
}

export default NavBar;

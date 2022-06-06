import React, { useState, useEffect } from "react";
import IntersectionRow from "../components/IntersectionRow";
import RestaurantSelect from "../components/RestaurantSelect";
import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
} from "@mui/material/";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Intersections() {
  const [intersections, setIntersections] = useState([{}]);
  const [restaurants, setRestaurants] = useState([{}]);
  const [restaurantID, setRestaurantID] = useState([{}]);
  const [categories, setCategories] = useState([{}]);
  const [categoryID, setCategoryID] = useState([{}]);

  useEffect(() => {
    console.log("IN EFFECT");
    readIntersections();
    readRestaurants();
    readCategories();
  }, []);

  function readIntersections() {
    fetch(`https://dry-bayou-57145.herokuapp.com/backend/intersections`)
      .then((response) => response.json())
      .then((data) => setIntersections(data));
    console.log("setIntersections called");
  }

  function deleteIntersection(id) {
    fetch(`https://dry-bayou-57145.herokuapp.com/backend/intersections/${id}`, {
      method: "DELETE",
    }).then(() => console.log(`deleting ${id}`));
    const allIntersections = [...intersections];
    let updatedIntersections = allIntersections.filter(
      (intersection) => intersection.restaurantsWithCategoriesID !== id
    );
    setIntersections(updatedIntersections);
  }

  function readRestaurants() {
    fetch("https://dry-bayou-57145.herokuapp.com/backend/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data));
  }

  function readCategories() {
    fetch("https://dry-bayou-57145.herokuapp.com/backend/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .then(() => console.log("readCategories called"));
  }

  function onChangeRestaurantID(event) {
    setRestaurantID(event.target.value);
  }

  function onChangeCategoryID(event) {
    setCategoryID(event.target.value);
  }


  function createIntersection(event) {
    async function postIntersection(newIntersection) {
      fetch(`https://dry-bayou-57145.herokuapp.com/backend/intersections`, {
        method: "POST",
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify(newIntersection),
      })
        .then((response) => response.json())
        .then(() => readIntersections());
    }

    event.preventDefault();
    let newIntersection = {
      categoryID,
      restaurantID,
    };
    postIntersection(newIntersection).then(() => "POSTing new intersection");
  }
  return (
    <div>
    <h1>Restaurants with Categories</h1>
    <h2>Associate category to an existing restaurant </h2>
      <Form onSubmit={createIntersection}>
      <Form.Group>
        <Form.Label htmlFor="restaurantID">Select a Restaurant</Form.Label>
        <Form.Select
          name="restaurantID"
          id="restaurantID"
          onChange={onChangeRestaurantID}
          required
        >
  
          <option disabled selected value="">
            {" "}
            — Select an Option —{" "}
          </option>
          {restaurants.map((restaurant) => {
            return <RestaurantSelect data={restaurant} />;
          })}
        </Form.Select>
        </Form.Group>
        <Form.Label htmlFor="categoryID">Category</Form.Label>
        <Form.Select
          name="categoryID"
          id="categoryID"
          onChange={onChangeCategoryID}
          required
        >
          <option disabled selected value="">
            {" "}
            — Select an Option —{" "}
          </option>
          {categories.map((category) => {
            return (
              <option value={category.categoryID}>
                {category.categoryName}
              </option>
            );
          })}
        </Form.Select>
        <Form.Text className="text-muted">Restaurants can have multiple categories, and categories can have multiple restaurants</Form.Text>
        <br/>
        <Button variant="primary" type="submit" value="Submit">Submit</Button>
      </Form>
    
      <h2>Restaurants with Categories Table</h2>
      <TableContainer>
      <Table>
        <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Restaurant Name</TableCell>
          <TableCell>Remove</TableCell>
        </TableRow>
        </TableHead>
        {intersections.map((intersection) => {
          return (
            <IntersectionRow
              data={intersection}
              deleteIntersection={deleteIntersection}
            />
          );
        })}
      </Table>
      </TableContainer>
    </div>
  );
}
export default Intersections;

// Problem: we can make multiple of the same composite key combinations -- solution might be here:
// https://stackoverflow.com/questions/57136858/efficient-way-to-check-if-composite-key-exists-before-inserting

import React, { useState, useEffect } from "react";
import IntersectionRow from "../components/IntersectionRow";
import RestaurantSelect from "../components/RestaurantSelect";

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
    fetch(`http://localhost:5000/backend/intersections`)
      .then((response) => response.json())
      .then((data) => setIntersections(data));
    console.log("setIntersections called");
  }

  function deleteIntersection(id) {
    fetch(`http://localhost:5000/backend/intersections/${id}`, {
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

  function editIntersection(event) {
    event.preventDefault();
    async function putIntersection(categoryID, restaurantID) {
      fetch(
          `http://localhost:5000/backend/intersections/category/${categoryID}/restaurant/${restaurantID}`,
          {
            method: "PUT",
          }
      ).then((response) => response.json());
      readIntersections();
    }
    putIntersection(categoryID, restaurantID).then(() =>
      console.log("Edited intersection!")
    );
  }

function createIntersection(event){
  async function postIntersection(newIntersection) {
    fetch(`http://localhost:5000/backend/intersections`, {
      method: "POST",
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(newIntersection),
    }).then((response) => response.json())
    .then(() => readIntersections())
  }

    event.preventDefault()
    let newIntersection= {
    categoryID,
    restaurantID
    }
    postIntersection(newIntersection)


  }
  return (
    <div>
      <h1>Restaurants with Categories</h1>
      <h2>Restaurants with Categories Table</h2>
      <table>
        <tr>
          <th>ID</th>
          <th>Category</th>
          <th>Restaurant Name</th>
        </tr>
        {intersections.map((intersection) => {
          return (
            <IntersectionRow
              data={intersection}
              deleteIntersection={deleteIntersection}
            />
          );
        })}
      </table>

      <h2>Associate category to an existing restaurant </h2>

      <form onSubmit={createIntersection}>
        <label htmlFor="restaurantID">Select a Restaurant</label>
        <select
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
        </select>
        <br />
        <br />
        <label htmlFor="categoryID">Category</label>
        <select
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
        </select>
        <br />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}
export default Intersections;


// Problem: we can make multiple of the same composite key combinations -- solution might be here:
// https://stackoverflow.com/questions/57136858/efficient-way-to-check-if-composite-key-exists-before-inserting
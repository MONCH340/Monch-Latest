import React, { useState, useEffect } from "react";
import IntersectionRow from "../components/IntersectionRow";
import RestaurantSelect from "../components/RestaurantSelect";

function Intersections() {
  const [intersections, setIntersection] = useState([{}]);
  const [restaurants, setRestaurants] = useState([{}]);
  // const [category, setCategoryID] = useState([{}]);
  const [restaurantID, setRestaurantID] = useState([{}]);

  useEffect(() => {
    console.log("IN EFFECT");
    readIntersections();
    readRestaurants();
  }, []);

  function readIntersections() {
    fetch(`http://localhost:5000/backend/intersections`)
      .then((response) => response.json())
      .then((data) => setIntersection(data));
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
    setIntersection(updatedIntersections);
  }

  const readRestaurants = () => {
    fetch("https://dry-bayou-57145.herokuapp.com/backend/restaurants")
        .then((response) => response.json())
        .then((data) => setRestaurants(data));
  };

  function onChangeRestaurantID(event) {
    setRestaurantID(event.target.value);
  }

  // function onChangeCategoryID(event) {
  //   setCategoryID(event.target);
  // }



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

      <form>
        <label htmlFor="restaurantID">Select a Restaurant</label>
        <select
          name="restaurantID"
          id="restaurantID"
          onChange={onChangeRestaurantID}
          required
        >
          <option disabled selected value="">
            {" "}
            -- select an option --{" "}
          </option>
          {restaurants.map((restaurant) => {
            return <RestaurantSelect data={restaurant} />;
          })}
        </select>
        <br />
        <label htmlFor="categoryID">Category</label>
        {/*<select name="categoryID" id="categoryID" onChange={onChangeCategoryID}>*/}
        {/*  {category.map((category1) => {*/}
        {/*    return (*/}
        {/*      <option value={category1.categoryID}>*/}
        {/*        {category1.categoryName}*/}
        {/*      </option>*/}
        {/*    );*/}
        {/*  })}*/}
        {/*</select>*/}
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}
export default Intersections;

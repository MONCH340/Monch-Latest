import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { sample_intersections } from "../sample_data/intersections";
import IntersectionRow from "../components/IntersectionRow";
import { sample_categories} from "../sample_data/categories"
import { sample_restaurants } from "../sample_data/restaurants"

function Intersections() {
  const [intersections, setIntersection] = useState(sample_intersections);
  const [restaurants, setRestaurants] = useState(sample_restaurants)
  const [categories, setCategories] = useState(sample_categories)
  function deleteIntersection() {
    alert("Deleting Intersection!");
  }

  return (
    <div>
      <h1>Restaurants with Categories</h1>
      <NavBar />
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
        <h2>Attach a new categories to an existing Restaurant</h2>
        <label htmlFor="restaurant">Restaurant</label>
        <select name="restaurant" id="restaurant">
            {
              restaurants.map((restaurant) => {
                return (
                  <option value={restaurant.restaurantID}>
                    {restaurant.restaurantName}
                  </option>
                )
              })
            }
        </select>
        <br/>
        <label htmlFor="category">Category</label>
        <select name="category" id="category">
        {
              categories.map((category) => {
                return (
                  <option value={category.categoryID}>
                    {category.categoryName}
                  </option>
                )
              })
            }
        </select>
        <br/>
        <button>Submit</button>
      </form>
    </div>
  );
}
export default Intersections;

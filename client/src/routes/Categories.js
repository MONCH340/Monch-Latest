import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { sample_categories } from "../sample_data/categories";
import CategoryRow from "../components/CategoryRow";

function Categories() {
  const [categories, setCategory] = useState(sample_categories);
  function deleteCategory() {
    alert("Deleting Category");
  }
  return (
    <div>
      <h1>Category</h1>
      <NavBar />
      <h2>Category Table</h2>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
        {categories.map((category) => {
          return (
            <CategoryRow data={category} deleteCategories={deleteCategory} />
          );
        })}
      </table>

      <form>
        <h2>Create a Category</h2>
        <label htmlFor="categoryName"> Enter a Category name</label>
        <input type="text" name="categoryName" id="categoryName" />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Categories;

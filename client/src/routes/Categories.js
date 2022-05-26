import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { sample_categories } from "../sample_data/categories";
import CategoryRow from "../components/CategoryRow";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  TextField,
} from "@mui/material/";
import { TableHead } from "@mui/material";

function Categories() {
  const [categories, setCategories] = useState([{}]);
  const [categoryName, setCategoryName] = useState("");
  useEffect(() => {
    console.log("IN EFFECT");
    getCategories();
  }, []);

  function onChangeCategory(event) {
    setCategoryName(event.target.value);
  }

  const getCategories = () => {
    fetch("https://dry-bayou-57145.herokuapp.com/backend/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .then(console.log("getCategories called"));
  };

  const removeCategory = (id) =>
    fetch(`https://dry-bayou-57145.herokuapp.com/backend/categories/${id}`, {
      method: "DELETE",
    });

  function deleteCategory(id) {
    // removeCategory(id).then((response) => console.log(response));
    removeCategory(id);
    const allCategories = [...categories];
    let updatedCategories = allCategories.filter(
      (category) => category.categoryID !== id
    );
    setCategories(updatedCategories);
  }
  const postCategory = async (newCategory) => {
    fetch(`http://localhost:5000/categories/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    })
      .then((response) => response.json())
      .then(() => getCategories());
  };

  function createCategory(event) {
    event.preventDefault();
    let newCategory = {
      categoryName: categoryName,
    };
    postCategory(newCategory);
  }

  return (
    <div>
      <h1>Category</h1>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
        {categories.map((category) => {
          return (
            <CategoryRow data={category} deleteCategory={deleteCategory} />
          );
        })}
      </table>

      <form onSubmit={createCategory}>
        <h2>Create a Category</h2>
        <label htmlFor="categoryName"> Enter a Category name:</label>
        <input
          type="text"
          name="categoryName"
          id="categoryName"
          onChange={(e) => onChangeCategory(e)}
        />
        <br />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
}

export default Categories;

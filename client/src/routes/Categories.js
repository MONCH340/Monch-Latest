import React, { useEffect, useState } from "react";
import CategoryRow from "../components/CategoryRow";
import {
  Table,
  TableCell,
  TableRow,
  TableContainer,
} from "@mui/material/";
import { TableHead } from "@mui/material";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Categories() {

  const [categories, setCategories] = useState([{}]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    console.log("IN EFFECT");
    readCategories();
  }, []);

  function onChangeCategory(event) {
    setCategoryName(event.target.value);
  }

  const readCategories = () => {
    fetch("https://dry-bayou-57145.herokuapp.com/backend/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .then(()=> console.log("readCategories called"));
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
    fetch(`https://dry-bayou-57145.herokuapp.com/backend/categories/`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(newCategory),
    })
      .then((response) => response.json())
      .then(() => readCategories());
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
      <Form onSubmit={createCategory}>
        <h2>Create a Category</h2>
        <Form.Label htmlFor="categoryName">Category Name</Form.Label>
        <Form.Control
          type="text"
          name="categoryName"
          id="categoryName"
          onChange={(e) => onChangeCategory(e)}
        />
                <Button variant="primary" type="submit" value="Submit">Submit </Button>
      </Form>
      <br />
      <TableContainer>
      <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Remove</TableCell>
        </TableRow>
        </TableHead>
        {categories.map((category) => {
          return (
            <CategoryRow data={category} deleteCategory={deleteCategory} />
          );
        })}
      </Table>
      </TableContainer>
    </div>
  );
}

export default Categories;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./routes/Users";
import Reviews from "./routes/Reviews";
import Restaurants from "./routes/Restaurants";
import Categories from "./routes/Categories";
import Coupons from "./routes/Coupons";
import Intersections from "./routes/Intersections";
import Home from "./routes/Home";
import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Router Details: https://reactrouter.com/docs/en/v6/getting-started/tutorial
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />}>
      <Route path="home" element={<Home />} />
      <Route path="users" element={<Users />} />
      <Route path="reviews" element={<Reviews />} />
      <Route path="restaurants" element={<Restaurants />} />
      <Route path="categories" element={<Categories />} />
      <Route path="categories_restaurants" element={<Intersections />} />
      <Route path="coupons" element={<Coupons />} />
      <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
    </Route> 
    </Routes>
  </BrowserRouter>
);

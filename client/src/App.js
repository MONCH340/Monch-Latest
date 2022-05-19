import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
/* 
  1. Create Sample Data X
  2. Create Table X
  3. Create row components X 
  4. Create form for insert X
  5. create form for delete -----
  6. create query for insert/delete ----- 
  */

function App() {
  return (
    <div>
      <h1>MONCH</h1>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;

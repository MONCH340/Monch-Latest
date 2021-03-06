import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'


// React starter guide created here: https://reactjs.org/tutorial/tutorial.html
function App() {
  return (
    <div>
      <Container>
      <NavBar />
      <Outlet />
      <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
    />
    </Container>
    </div>
    
  );
}

export default App;

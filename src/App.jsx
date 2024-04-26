import { useState } from "react";
import { AppProvider } from "./components/Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Editing from "./pages/Editing";
import SingleBlog from "./pages/SingleBlog";

function App() {
  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <Nav></Nav>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/blog/:blogID" element={<SingleBlog />}></Route>
            <Route exact path="/blog/create" element={<Editing />}></Route>
            {/* <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/" element={<Home/>}></Route> */}
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </>
  );
}

export default App;

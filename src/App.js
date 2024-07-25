import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView.jsx";

const App = () => {
  return (
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomeView />} />
      </Routes>
  </BrowserRouter>
  );
};

export default App;
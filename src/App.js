import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView.jsx";

const App = () => {
  return (
    git push origin master  <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
          <Route path="/" element={<HomeView />} />
      </Routes>
  </BrowserRouter>
  );
};

export default App;
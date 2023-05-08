import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/home"
import Scores from "./components/scores";

const RouteSwitch = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<App />} />
        <Route path="/scores" element={<Scores />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
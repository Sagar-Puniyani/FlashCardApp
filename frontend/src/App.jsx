import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ButtonDashboard from "./components/dashboardbutton";
import FlashcardView from "./components/flashcardView";
import AdminDashboard from "./components/Admindashboard";
import HomeButton from "./components/homebutton";

function App() {
  // const location = useLocation();
  return (

    <Router>
      <ButtonDashboard />
      <HomeButton />
      <Routes>
        <Route path="/" element={<FlashcardView />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

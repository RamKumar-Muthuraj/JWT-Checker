import React from "react";
import {  Route, Routes } from "react-router-dom";
import Login from "../layout/Login";
import Dashboard from "../pages/Dashboard";


export default function AppRouter() {
  return (

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

  );
}

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Results from "./Results";

const paths = ["/search", "/images", "/news", "/videos"];
const AppRoutes = () => {
  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<Navigate to="/search" />} />
        const paths = ["/search", "/images", "/news", "/videos"];
        {paths.map((path) => (
          <Route path={path} element={<Results />} />
        ))}
      </Routes>
    </div>
  );
};

export default AppRoutes;

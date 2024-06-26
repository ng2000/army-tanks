import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarComponent from "./navbar/Navbar";
import DataGrid from './dataGrid/DataGrid';
import ApplyForAccess from "./addTank/AddTank";
import FileUploadImport from "./fileUploadImport/FileUploadImport";
import Footer from "./footer/Footer"
import Analytics from "./graphs/Analytics";
import DueDataGrid from "./dueDataGrid/DueDataGrid";
import TankSummary from "./tankSummary/TankSummary";
import LoginPage from "./login/LoginPage";

// Higher-order component for authentication
const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  console.log(localStorage.getItem('isLoggedIn'))
  console.log(isLoggedIn)
  return isLoggedIn ? element : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="App">
      {!isLoginPage && <NavbarComponent />}
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Analytics />} />} />
        <Route path="/eqptdb" element={<ProtectedRoute element={<DataGrid />} />} />
        <Route path="/import" element={<ProtectedRoute element={<FileUploadImport />} />} />
        <Route path="/add" element={<ProtectedRoute element={<ApplyForAccess />} />} />
        <Route path="/search" element={<ProtectedRoute element={<DueDataGrid />} />} />
        <Route path="/summary" element={<ProtectedRoute element={<TankSummary baNo={'05X 4H'} />} />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default App;

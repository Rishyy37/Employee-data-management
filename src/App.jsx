import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers(page);
    }
  }, [isAuthenticated]);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch users.");
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/users"
          element={
            isAuthenticated ? (
              <UserList
                users={users}
                setUsers={setUsers}
                setPage={setPage}
                page={page}
                setIsAuthenticated={setIsAuthenticated}
                fetchUsers={fetchUsers}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/edit/:id"
          element={
            isAuthenticated ? <EditUser users={users} setUsers={setUsers} /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UserList = ({ users, setUsers, page, setPage, setIsAuthenticated, fetchUsers }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted!");
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handlePageChange = async (e, newPage) => {
    e.preventDefault(); // Prevents the page from reloading
    if (newPage < 1) return;
    await fetchUsers(newPage);
    setPage(newPage);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center">Users List</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img src={user.avatar} alt={user.first_name} className="rounded-circle" width="50" />
                </td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>
                  <button onClick={() => navigate(`/edit/${user.id}`)} className="btn btn-success btn-sm me-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <button disabled={page === 1} onClick={(e) => handlePageChange(e, page - 1)} className="btn btn-secondary">
          Previous
        </button>
        <button onClick={(e) => handlePageChange(e, page + 1)} className="btn btn-secondary">
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;

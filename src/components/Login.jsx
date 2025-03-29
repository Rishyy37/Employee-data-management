import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VALID_EMAIL = "eve.holt@reqres.in";  // ✅ Hardcoded valid email
const VALID_PASSWORD = "cityslicka";       // ✅ Hardcoded valid password

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Manually check email & password before API call
    if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
      setError("Invalid email or password!"); // Show error message
      return;
    }

    try {
      const response = await axios.post("https://reqres.in/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      toast.success("Login successful!");
      navigate("/users");
    } catch (error) {
      toast.error("Login failed! Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>} {/* ✅ Show error message */}
        <form onSubmit={handleLogin} autoComplete="off"> {/* ✅ Disable browser autofill */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="new-email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

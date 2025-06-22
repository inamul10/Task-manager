import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const apiUrl = "http://localhost:5005/api/";
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    const { email, password } = formData;

    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter a valid email address.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    return newErrors;
  };
  const navigate = useNavigate();
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoggedIn(false);
    } else {
      setErrors({});
      await axios
        .post(apiUrl + "auth/login", formData)
        .then((response) => {
          setIsLoggedIn(true);
          localStorage.setItem("auth", true);
          console.log("RES : ", response);
          navigate("/");
        })
        .catch((err) => {
          setIsLoggedIn(false);
          // If backend sends specific error message
          if (err.response && err.response.data && err.response.data.msg) {
            setErrors({ api: err.response.data.msg });
          } else {
            setErrors({ api: "Login failed. Please try again." });
          }
        });

      // Optionally reset form
      // setFormData({
      //   email: "",
      //   password: "",
      // });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        width: "50%",
      }}
    >
      <div className="my-4">
        <h1>Login</h1>
      </div>
      <form
        className="container my-4"
        style={{
          backgroundColor: "#f3f3f3",
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
        onSubmit={handleSubmit}
      >
        {/* Email Field */}
        <div className="mb-3 w-100">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        {/* Password Field */}
        <div className="mb-3 w-100">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="text-danger">{errors.password}</div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>

        <div className="mt-2">
          <p>
            If you don't have an account, <Link to="/signup">Sign up</Link>
          </p>
        </div>

        {isLoggedIn && (
          <p className="text-success mt-3">You're logged in successfully!</p>
        )}

        {errors.api && <p className="text-danger mt-3">{errors.api}</p>}
      </form>
    </div>
  );
};

export default Login;

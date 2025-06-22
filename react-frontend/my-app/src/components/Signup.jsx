import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "default",
    role: "user",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSignedUp, setIsSignedUp] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    const { email, password, confirmPassword } = formData;

    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter a valid email address.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSignedUp(false);
    } else {
      setErrors({});
      const apiUrl = "http://localhost:5005/api/";
      await axios
        .post(apiUrl + "auth/register", formData)
        .then((response) => {
          setIsSignedUp(true);
          localStorage.setItem("auth", true);
          console.log("RES : ", response);
          navigate("/");
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.msg) {
            setErrors({ api: err.response.data.msg });
          } else {
            setErrors({ api: "Login failed. Please try again." });
          }
        });
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
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
        <h1>Sign-Up</h1>
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
            placeholder="user@example.com"
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        {/* Password Field */}
        <div className="mb-3 w-100">
          <label htmlFor="password" className="form-label">
            New Password
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

        {/* Confirm Password Field */}
        <div className="mb-3 w-100">
          <label htmlFor="confirmPassword" className="form-label">
            Re-Enter Password
          </label>
          <input
            type="password"
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="text-danger">{errors.confirmPassword}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>

        <div className="mt-2">
          <p>
            If you already have an account, <Link to="/login">Login</Link>
          </p>
        </div>

        {isSignedUp && (
          <p className="text-success mt-3">You're signed up successfully!</p>
        )}
      </form>
    </div>
  );
};

export default Signup;

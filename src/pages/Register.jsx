import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      alert("Registration successful! Please subscribe.");
      navigate("/subscribe");
    } catch (err) {
      alert(err.response?.data?.error || "Registration error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

        <form onSubmit={register} className="space-y-4">

          {/* First Name */}
          <div>
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              name="first_name"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              name="last_name"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1">Register As</label>
            <select
              name="role"
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            >
              <option value="customer">Customer</option>
              <option value="cleaner">Cleaner</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

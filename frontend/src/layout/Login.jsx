import React, { useState } from "react";
import Form from "../components/ui/Form";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

export default function Login() {
  const [mode, setMode] = useState("register");
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const registerFields = [
    { name: "name", label: "Name", type: "text", required: true },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
      match: emailRegex,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      match: passwordRegex,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      required: true,
    },
  ];

  const loginFields = [
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
      match: emailRegex,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
    },
  ];

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (data) => {
    try {
      let response;

      if (mode === "register") {
        response = await axiosInstance.post("/auth/signUpOne", data);
        console.log("Register Success:", response.data);
        setMode("login");
        resetForm();
      } else {
        response = await axiosInstance.post("/auth/loginOne", data);
        const token = response.data?.token;
        if (token) {
          sessionStorage.setItem("token", token);
          console.log("Login Success:", response.data);
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error(
        "Authentication Failed:",
        error.response?.data?.message || error.message,
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-between bg-gray-100 p-4 ">
      <div className="w-full max-w-6xl  bg-white rounded-4xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 mx-auto">
        {/* Left Image */}
        <div className="hidden md:block relative h-150 p-2">
          <img
            src="https://images.unsplash.com/photo-1772668193860-f9d6e55469a1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="auth"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>

        {/* Right Form */}
        <div className="p-4 flex flex-col justify-center">
          <h2 className="text-5xl font-normal mb-2 text-(--text-primary-color) mx-auto">
            {mode === "register" ? "Create an Account" : "Welcome Back"}
          </h2>

          <p className="text-gray-500 font-medium mb-6 mx-auto">
            {mode === "register"
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              onClick={() =>
                setMode(mode === "register" ? "login" : "register")
              }
              className="text-(--purple-color) ml-2 font-semibold"
            >
              {mode === "register" ? "Log in" : "Register"}
            </button>
          </p>

          <Form
            fields={mode === "register" ? registerFields : loginFields}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            buttonText={mode === "register" ? "Create Account" : "Login"}
            direction={
              mode === "register"
                ? "grid grid-cols-1 md:grid-cols-2"
                : "grid-cols-1"
            }
            size="max-w-lg"
            bgColor="bg-white"
          />
        </div>
      </div>
    </div>
  );
}

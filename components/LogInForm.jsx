"use client";
import React, { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form className="form mx-auto mt-96 max-sm:mt-44" onSubmit={handleSubmit}>
      <p className="form-title">تسجيل الدخول</p>
      <div className="input-container">
        <input
          placeholder="أدخل رقم الهاتف"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <span>
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </span>
      </div>
      <div className="input-container">
        <input
          placeholder="أدخل كلمة السر"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <span>
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
            <path
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </span>
      </div>
      <button className="submit" type="submit">
        تسجيل الدخول
      </button>
    </form>
  );
}

export default LoginForm;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser()
        console.log({ email, password });
        setEmail("");
        setPassword("");
    };

    const loginUser = () => {
        fetch("https://bookmatebb-react-backend.onrender.com/api/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error_message) {
                    alert(data.error_message);
                } else {
                    alert(data.message);
                    navigate("/dashboard");
                    localStorage.setItem("_id", data.id);
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <main className="login-container">
          <div className="login-card">
            <h1 className="login-title">Log into your account</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-input"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="form-button" type="submit">SIGN IN</button>
            </form>
            <p className="form-footer">
              Don't have an account? <Link to="/register" className="form-link">Create one</Link>
            </p>
          </div>
        </main>
      );
};



export default Login;
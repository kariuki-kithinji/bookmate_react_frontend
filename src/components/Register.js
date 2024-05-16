import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ username, email, password });
        //👇🏻 Triggers the function
        signUp();
        setEmail("");
        setUsername("");
        setPassword("");
    };

    const signUp = () => {
        fetch("https://bookmatebb-react-backend.onrender.com/api/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                username,
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
                    alert("Account created successfully!");
                    navigate("/");
                }
            })
            .catch((err) => console.error(err));
    };
    
    return (
        <main className="register-container">
          <div className="register-card">
            <h1 className="register-title">Create an account</h1>
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-input"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
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
              <button className="form-button" type="submit">REGISTER</button>
            </form>
            <p className="form-footer">
              Have an account? <Link to="/" className="form-link">Sign in</Link>
            </p>
          </div>
        </main>
      );
};


export default Register;
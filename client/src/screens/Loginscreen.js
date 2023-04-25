import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState();

  async function login() {
    const user = {
      email,
      password,
    };
    try {
      setloading(true);
      const result = (await axios.post("/api/users/login", user)).data;
      setloading(false);
      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setloading(false);
      setError(true);
    }
  }
  return (
    <div>
      {loading && <Loader />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message="Invalid Credentials!" />}
          <div className="bs">
            <h2>Login</h2>
            <label htmlFor="email-input">Email<span style={{ color: "red" }}>*</span></label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <label htmlFor="password-input">Password<span style={{ color: "red" }}>*</span></label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />

            <button className="btn btn-primary mt-3" onClick={login}>
              Login
            </button>
            <div className="mt-2">
              <span>Don't have an account? </span>
              <a href="/register">Register</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;

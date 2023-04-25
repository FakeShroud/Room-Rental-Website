import axios from "axios";
import React, { useState } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Registerscreen() {
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
  const [district, setdistrict] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState();
  const [success, setsuccess] = useState();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  async function checkEmailExists() {
    const response = await axios.post("/api/users/checkemailexists", {
      email,
    });
  
    return response.data;
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async function register(e) {
    e.preventDefault();
    if(number.length !== 10){
      alert("Phone Number must be more than 10 digits!");
      return;
    }
    const emailExists = await checkEmailExists();
    if (emailExists) {
      alert("Email already exists");
      return;
    }

    if (password === cpassword) {
      const capitalized_name = capitalizeFirstLetter(name);
      const user = {
        name: capitalized_name,
        number,
        district,
        email,
        password,
        cpassword,
      };
      try {
        setloading(true);
        const result = await axios.post("/api/users/register", user).data;
        setloading(false);
        setsuccess(true);
        setname("");
        setnumber("");
        setdistrict("");
        setemail("");
        setpassword("");
        setcpassword("");
      } catch (error) {
        console.log(error);
        setloading(false);
        setError(true);
      }
    } else {
      alert("Passwords not matched");
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {success && <Success message="Registration Successful" />}
          <div className="bs">
            <h2>Register</h2>
            <form onSubmit={register}>
              <label htmlFor="name-input">Name<span style={{ color: "red" }}>*</span></label>
              <input
                id="name-input"
                type="text"
                className="form-control mb-3"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
                required
              />

              <label htmlFor="number-input">Phone Number<span style={{ color: "red" }}>*</span></label>
              <input
                id="number-input"
                type="tel"
                className="form-control mb-3"
                placeholder="Phone Number"
                value={number}
                onChange={(e) => {
                  setnumber(e.target.value);
                }}
                required
              />

              <label htmlFor="district-input">District<span style={{ color: "red" }}>*</span></label>
              <input
                id="district-input"
                type="text"
                className="form-control mb-3"
                placeholder="District"
                value={district}
                onChange={(e) => {
                  setdistrict(e.target.value);
                }}
                required
              />

              <label htmlFor="email-input">Email<span style={{ color: "red" }}>*</span></label>
              <input
                id="email-input"
                type="text"
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                required
                pattern={emailRegex.source}
                title="Please enter a valid email address"
              />

              <label htmlFor="password-input">Password<span style={{ color: "red" }}>*</span></label>
              <input
                id="password-input"
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                required
              />

              <label htmlFor="cpassword-input">Confirm Password<span style={{ color: "red" }}>*</span></label>
              <input
                id="cpassword-input"
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={cpassword}
                onChange={(e) => {
                  setcpassword(e.target.value);
                }}
                required
              />

              <button className="btn btn-primary mt-3" type="submit">
                Register
              </button>
              <div className="mt-2">
                <span>Already have an account? </span>
                <a href="/login">Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;


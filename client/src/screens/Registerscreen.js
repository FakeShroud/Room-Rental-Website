import axios from "axios";
import React, { useState} from "react";
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
  async function register() {
    if (password === cpassword) {
      const user = {
        name,
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
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              type="tel"
              className="form-control"
              placeholder="Phone Number"
              value={number}
              onChange={(e) => {
                setnumber(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="District"
              value={district}
              onChange={(e) => {
                setdistrict(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />

            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />
            <button className="btn btn-primary mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;

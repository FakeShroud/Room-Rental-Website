import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { Tag } from "antd";
import { Tabs } from "antd";
const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  return (
    <div className="container mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">District</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.district}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.number}</p>
                  </div>
                </div>
              </div>
            </div>
           <Link to='/postroom'>
           <div className="text-right">
              
              <button className="btn btn-primary">Post Room</button>
            </div>
           </Link>
          </div>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
        <TabPane tab="Post Room" key="3">
          <PostRoom />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState();

  async function getBookings() {
    try {
      setloading(true);
      const response = await axios.post("/api/bookings/getbookingsbyuserid", {
        userid: user._id,
      });
      console.log(response.data);
      setbookings(response.data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      setError(error);
    }
  }

  useEffect(() => {
    getBookings();
  }, []);

  async function cancelBooking(bookingid, roomid) {
    try {
      setloading(true);
      const result = await axios.post("/api/bookings/cancelbooking", {
        bookingid,
        roomid,
      }).data;
      console.log(result);
      setloading(false);
      Swal.fire("Congrats!", "Booking Cancelled Successfully", "success").then(
        (result) => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
      setloading(false);
      Swal.fire("Oops!", "Something went wrong", "error");
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings?.map((booking) => {
            return (
              <div key={booking._id} className="bs">
                <h1>{booking.data}</h1>
                <p>
                  <b>BookingId:</b> {booking._id}
                </p>
                <p>
                  <b>From:</b> {booking.fromdate}
                </p>
                <p>
                  <b>To:</b> {booking.todate}
                </p>
                <p>
                  <b>Status:</b>{" "}
                  {booking.status === "cancelled" ? (
                    <Tag color="orange">CANCELLED</Tag>
                  ) : (
                    <Tag color="green">CONFIRMED</Tag>
                  )}
                </p>
                {booking.status !== "cancelled" && (
                  <div className="text-right">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        cancelBooking(booking._id, booking.roomid);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function PostRoom() {
  // const [name, setname] = useState("");
  // const [rentpermonth, setrentpermonth] = useState("");
  // const [maxcount, setmaxcount] = useState("");
  // const [description, setdescription] = useState("");
  // const [phonenumber, setphonenumber] = useState("");
  // const [type, settype] = useState("");
  // const [imageurl1, setimage1] = useState("");
  // const [imageurl2, setimage2] = useState("");
  // const [imageurl3, setimage3] = useState("");



  return (
    <div className="row bs">
      <div className="col-md-5">
        <input type="text" className="form-control mb-3" placeholder="Room Name" 
        />
        <input type="text" className="form-control mb-3" placeholder="RentPerMonth" />
        <input type="text" className="form-control mb-3" placeholder="Maximum People" />
        <input type="text" className="form-control mb-3" placeholder="Description" />
        <input type="text" className="form-control mb-3" placeholder="Phone Number" />
      </div>
      <div className="col-md-5">
        <input type="text" className="form-control mb-3" placeholder="Floor" />
        <input type="text" className="form-control mb-3" placeholder="Image URL 1" />
        <input type="text" className="form-control mb-3" placeholder="Image URL 2" />
        <input type="text" className="form-control mb-3" placeholder="Image URL 3" />
        <div className="text-right">
          <button className="btn btn-primary mt-1">Post Room</button>
        </div>
      </div>
    </div>
  );
}

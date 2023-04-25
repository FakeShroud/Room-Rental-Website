import React, { useState, useEffect } from "react";
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
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h1>Name: {user.name} </h1>
          <h1>Email: {user.email}</h1>
          <h1>isAdmin: {user.isAdmin ? "Yes" : "No"}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
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
              <div className="bs">
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

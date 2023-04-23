import React, { useState, useEffect } from "react";
import axios from "axios";

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

// export function MyBookings() {
//   const user = JSON.parse(localStorage.getItem("currentUser"));
//   useEffect(async () => {
//     try {
//       const rooms = await axios.post("/api/bookings/getbookingsbyuserid/", {
//         userid: user._id,
//       }).data;
//       console.log(rooms);
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);

//   return <h1>My Bookings</h1>;
// }
export function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [bookings, setBookings] = useState([]);
  
    async function getBookings() {
      try {
        const response = await axios.post("/api/bookings/getbookingsbyuserid/", {
          userid: user._id,
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      getBookings();
    });
  
    return (
    <div>
        <div className="col-md-6">

        </div>
    </div>
    );
  }
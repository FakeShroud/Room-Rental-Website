import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { Upload } from "antd";
import { Tag } from "antd";
import { Tabs } from "antd";
const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [district, setDistrict] = useState(user.district);
  const [number, setNumber] = useState(user.number);
  const [postedRooms, setPostedRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }else {
      fetchPostedRooms();
    }
  }, [user]);
  const fetchPostedRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/rooms/user/${user.id}`);
      setPostedRooms(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (editing) {
      // Submit the form
      try {
        const updatedUser = { ...user, name, email, district, number };
        const response = await axios.put(`/api/users/${user.id}`, updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        Swal.fire("Congrats!", "Profile updated successfully", "success");
        console.log("Message", response)
      } catch (error) {
        console.log(user)
        console.log(error);
        
        //  await Swal.fire(
        //   "Oops!",
        //   "An error occurred while updating the profile.",
        //   "error"
        // );
      }
    }
    setEditing(!editing);
  };

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
                    {editing ? (
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    ) : (
                      <p className="text-muted mb-0">{name}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    {editing ? (
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    ) : (
                      <p className="text-muted mb-0">{email}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">District</p>
                  </div>
                  <div className="col-sm-9">
                    {editing ? (
                      <input
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                    ) : (
                      <p className="text-muted mb-0">{district}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    {editing ? (
                      <input
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                      />
                    ) : (
                      <p className="text-muted mb-0">{number}</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3"></div>
                  <div className="col-sm-9 text-right">
                    <button onClick={handleEdit} className="btn btn-primary">
                      {editing ? "Save" : "Edit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
        <TabPane tab="Post Room" key="3">
          <PostRoom />
        </TabPane>
        <TabPane tab="Posted Room" key="4">
          {/* <PostedRoom /> */}
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
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [rentpermonth, setRentpermonth] = useState("");
  const [maxcount, setMaxcount] = useState("");
  const [description, setDescription] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [type, setType] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  const cloudinaryUploadURL =
    "https://api.cloudinary.com/v1_1/dihbwaox5/image/upload";
  const cloudinaryUploadPreset = "room_rental";

  const handleFileChange = (info) => {
    let fileList = [...info.fileList];

    fileList = fileList.filter((file) => {
      const ext = file.name.split(".").pop().toLowerCase();
      return ext === "jpg" || ext === "png";
    });
    if (fileList.length > 3) {
      fileList = fileList.slice(-3);
    }
    setImageFiles(info.fileList);
  };

  const uploadImages = async () => {
    const uploadedImageUrls = [];
    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append("file", file.originFileObj);
      formData.append("upload_preset", cloudinaryUploadPreset);

      const response = await axios.post(cloudinaryUploadURL, formData);
      uploadedImageUrls.push(response.data.secure_url);
    }
    return uploadedImageUrls;
  };

  const addRoom = async () => {
    setLoading(true);

    const imageUrls = await uploadImages();

    const newroom = {
      name,
      rentpermonth,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: imageUrls,
    };

    try {
      const result = await axios.post("/api/rooms/addroom", newroom).data;
      setLoading(false);
      Swal.fire("Congrats!", "Room Added Successfully", "success").then(
        (result) => {
          window.location.href = "/home";
        }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Oops!", "Something went wrong", "error");
    }
  };

  return (
    <div className="row bs">
      <div className="col-md-5">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Room Name With Location"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="RentPerMonth"
          value={rentpermonth}
          onChange={(e) => setRentpermonth(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Maximum People"
          value={maxcount}
          onChange={(e) => setMaxcount(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Phone Number"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
        />
      </div>
      <div className="col-md-5">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Type 'FirstFloor/SecondFloor'"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <Upload
          listType="picture-card"
          fileList={imageFiles}
          onChange={handleFileChange}
          beforeUpload={() => false}
        >
          {imageFiles.length >= 3 ? null : (
            <div>
              <i className="fas fa-plus" />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </div>

      <div className="col-md-2">
        <button className="btn btn-dark" disabled={loading} onClick={addRoom}>
          {loading ? "Loading..." : "Add Room"}
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useCallback } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { Upload } from "antd";
const { TabPane } = Tabs;
function Adminscreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/";
    }
  });
  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        <b>Admin Screen</b>
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
       
        <TabPane tab="Users" key="3">
          <Users />
        </TabPane>
        <TabPane tab="Post room" key="4">
          <PostRoom />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = (await axios.get("/api/bookings/getallbookings")).data;
        setbookings(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    };

    fetchBookings();
  });
  const deleteBooking = async (id) => {
    try {
      const response = await axios.delete(`/api/bookings/${id}`);
      console.log('Delete booking response:', response);
      setbookings(bookings.filter((booking) => booking._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Booking Id</th>
              <th>UserID</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.data}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                    <td>
                      <button
                        onClick={() => deleteBooking(booking._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Rooms() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    console.log("useEffect called");
    const fetchBookings = async () => {
      try {
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    };

    fetchBookings();
  }, []);


  const deleteRoom = async (id) => {
    try {
      const response = await axios.delete(`/api/rooms/${id}`);
      console.log('Delete room response:', response);
      setrooms(rooms.filter((room) => room._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  
  

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Per Month</th>
              <th>Max People</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr key={room._id}>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentpermonth}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                    <td>
                      <button
                        onClick={() => deleteRoom(room._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Users() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = (await axios.get("/api/users/getallusers")).data;
        setusers(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    };

    fetchBookings();
  }, []);
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`/api/users/${id}`);
      console.log('Delete user response:', response);
      setusers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        {loading && <Loader />}
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>isAdmin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                    <td>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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
          placeholder="Room Name"
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
          placeholder="Type"
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
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "antd/dist/reset.css";
import { DatePicker, Space } from "antd";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
const { RangePicker } = DatePicker;

const Homescreen = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setloading] = useState();
  const [error, setError] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const { data: response } = await axios.get("/api/rooms/getallrooms");
        setDatas(response);
        
        setloading(false);
      } catch (error) {
        setError(true);
        console.error(error);
        setloading(false);
      }
    };

    fetchData();
  }, []);
  function filterByDate(dates) {
    setfromdate(dates[0].format("DD-MM-YYYY"));
    settodate(dates[1].format("DD-MM-YYYY"));

    // var temprooms = [];
    // var availability = false;
    // for (const room of duplicaterooms) {
    //   if (room.currentbookings.length > 0) {
    //     for (const booking of room.currentbookings) {
    //       if (
    //         !
    //           moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
    //             booking.fromdate,
    //             booking.todate
              
    //         ) &&
    //         !
    //           moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
    //             booking.fromdate,
    //             booking.todate
              
    //         )
    //       ) {
    //         if (
    //           moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
    //           moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
    //           moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
    //           moment(dates[1]).format("DD-MM-YYYY") !== booking.todate
    //         ) {
    //           availability = true;
    //         }
    //       }
    //     }
    //   }
    //   if (availability === true || room.currentbookings.length === 0) {
    //     temprooms.push(room);
    //   }
    //   setDatas(temprooms);
    // }
  }
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : datas.length > 1 ? (
          datas.map((data) => {
            return (
              <div className="col-md-9 mt-2">
                <Room data={data} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
};

export default Homescreen;

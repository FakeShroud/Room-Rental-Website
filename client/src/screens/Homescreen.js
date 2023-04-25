import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "antd/dist/reset.css";
import { DatePicker, Space } from "antd";
import Room from "../components/Room";
import Loader from "../components/Loader";
const { RangePicker } = DatePicker;

const Homescreen = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setloading] = useState();
  const [error, setError] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState('');
  const [searchkey, setsearchkey] = useState('');
  const [type, settype] = useState('all');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const { data: response } = await axios.get("/api/rooms/getallrooms");
        setDatas(response);
        setduplicaterooms(response);
        
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
    if (!dates || !dates[0] || !dates[1]) return;
    setfromdate(dates[0].format("DD-MM-YYYY"));
    settodate(dates[1].format("DD-MM-YYYY"));

    var temprooms = [];
    var availability = false;
    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !
              moment((dates[0]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              
            ) &&
            !
              moment((dates[1]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              
            )
          ) {
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability === true || room.currentbookings.length === 0) {
        temprooms.push(room);
      }
      
    }
    setDatas(temprooms);
  }
  function filterBySearch(){
    const temprooms = duplicaterooms.filter(datas => datas.name.toLowerCase().includes(searchkey.toLowerCase()))
    setDatas(temprooms);
  }
  function filterByType(e){
    settype(e);
    if(e !== 'all'){
      const temprooms = duplicaterooms.filter(datas => datas.type.toLowerCase()===e.toLowerCase())
      setDatas(temprooms);
    }
    else{
      setDatas(duplicaterooms);
    }
  }
  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className="col-md-5">
          <input type="text" className="form-control" placeholder="Search Rooms"
          value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterBySearch}
          />
        </div>
       <div className="col-md-3">
       <select className="form-control" value={type} onChange={(e) =>{filterByType(e.target.value)}}
       >
          <option value="all">All</option>
          <option value="FirstFloor">First Floor</option>
          <option value='SecondFloor'>Second Floor</option>

        </select>
       </div>

      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        )  : (
          datas.map((data) => {
            return (
              <div className="col-md-9 mt-2">
                <Room data={data} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        ) }
      </div>
    </div>
  );
};

export default Homescreen;

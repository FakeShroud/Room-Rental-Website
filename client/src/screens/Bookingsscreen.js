import React from "react";
import { useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";

function Bookingscreen({ match }) {
  const [data, setData] = useState();
  const [loading, setloading] = useState(true);
  const [error, setError] = useState();

  let { id } = useParams();
  let { fromdate } = useParams();
  let { todate } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const { data: response } = await axios.post("/api/rooms/getroombyid", {
          roomid: id,
        });

        setData(response);
        setloading(false);
      } catch (error) {
        setError(true);
        console.error(error);
        setloading(false);
      }
    };

    fetchData();
  }, [id]);
  const fromDateObj = moment(fromdate, "DD-MM-YYYY");
  const toDateObj = moment(todate, "DD-MM-YYYY");
  const totaldays = moment.duration(toDateObj.diff(fromDateObj)).asDays();

  async function bookRoom() {
    const bookingDetails = {
      data,
      roomid: data._id,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,

      todate,
      totaldays,
    };
    try {
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      console.log(result);
    } catch (error) {}
  }
  function onToken(token) {
    console.log(token);
  }

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : data ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{data.name}</h1>
              <img
                src={data.imageurls[0]}
                alt="FirstImage"
                className="bigimg"
              />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Renting Details</h1>
                <hr />
                <b>
                  <p>
                    Name: {JSON.parse(localStorage.getItem("currentUser")).name}{" "}
                  </p>
                  <p>From Date: {fromdate} </p>
                  <p>To Date: {todate}</p>
                  <p>Maximum people: {data.maxcount} </p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />

                  <p>Total Days: {totaldays} </p>
                  <p>Per Month: {data.rentpermonth} </p>
                  <p>Total Amount: {(data.rentpermonth / 30) * totaldays} </p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <button className="btn btn-primary" onClick={bookRoom}>
                  <StripeCheckout
                    token={onToken}
                    stripeKey="pk_test_51MzfgtDS7HkKPzS4Jy54wVnJuWQK9QC1n8tfv0pSzsD88dWW3BQhoAKmoNLjcZEQgWsXKPvhXGhALiAgLSovZYgw00uQS6g8hG"
                  />
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;

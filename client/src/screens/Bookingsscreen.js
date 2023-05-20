import React from "react";
import { useParams } from "react-router-dom";
import KhaltiCheckout from "khalti-checkout-web";

import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import Swal from "sweetalert2";

function Bookingscreen({ match }) {
  const [data, setData] = useState();
  const [loading, setloading] = useState(true);
  const [error, setError] = useState();

  let { id } = useParams();
  let { fromdate } = useParams();
  let { todate } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("currentUser")) {
        window.location.href = "/login";
      }
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
  const totalAmount = Math.round((data?.rentpermonth / 30) * totaldays);

  async function bookRoom() {
    const bookingDetails = {
      data,
      roomid: data._id,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,

      todate,
      totaldays,
    };
    if (totaldays < 30) {
      Swal.fire("Oops!", "Minimum rental period is 30 days.", "error");
      return;
    }
    try {
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      console.log(result);
      // Swal.fire("Congrats!", "Room Rented Successfully", "success");
      initiateKhaltiPayment();
    } catch (error) {}
  }
const [paymentResponse, setPaymentResponse] = useState(null);

  const initiateKhaltiPayment = async () => {
    const config = {
      publicKey: "test_public_key_343fd63d79484e2b9ca8af019a6ac1fe",
      amount: totalAmount * 100, // Amount in paisa
      productIdentity: data.name,
      productName: data.name,
      productUrl: "http://localhost:3000",
      eventHandler: {
        onSuccess(payload) {
          setPaymentResponse(payload);
          bookRoom(); 
          Swal.fire("Success!", "Payment Successful.", "success");
          window.location.href = "/profile";
        },
        onError(error) {
          console.log(error);
        },
        onClose() {
          console.log("Payment window closed.");
        },
      },
      paymentPreference: ["KHALTI"],
    };
  
    const checkout = new KhaltiCheckout(config);
    checkout.show({ amount: config.amount });
  };
  

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
                  {/* <p>Total Amount: {Math.round((data.rentpermonth / 30) * totaldays)} </p> */}
                  <p>Total Amount: {totalAmount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <button className="btn btn-primary" onClick={initiateKhaltiPayment}>
                  Rent Now
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

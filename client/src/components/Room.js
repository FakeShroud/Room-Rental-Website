import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
function Room({ data, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={data.imageurls[0]} className="smallimg" alt="roomimages"/>
      </div>
      <div className="col-md-7">
        <h1>{data.name}</h1>
        <b>
          <p>Maximum People: {data.maxcount}</p>
          <p>Phone Number: {data.phonenumber}</p>
          <p>Type: {data.type}</p>
        </b>
        <div style={{ float: "right" }}>
          {(fromdate && todate) && (
              <Link to={`/book/${data._id}/${fromdate}/${todate}`}>
              <button className="btn btn-primary m-2">Rent Now</button>
            </Link>
          )}
          
          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel='' nextLabel='' interval={1000}>
            {data.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100 bigimg"
                    src={url}
                    alt="First slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{data.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;

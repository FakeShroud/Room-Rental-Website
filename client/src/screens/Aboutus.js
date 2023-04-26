import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function AboutUs() {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h1 className="text-center mb-4" style={{fontWeight:'bold'}}>About Gharbada</h1>
          <Card>
            <Card.Body>
              <p>
                Welcome to Gharbhada, the best platform for finding the perfect room for your stay. Our mission is to provide affordable, comfortable, and convenient rental solutions for everyone.
              </p>
              <p>
                We have a wide range of rooms to cater to different preferences, budgets, and needs. Whether you're a student, a traveler, or a professional looking for a temporary stay, we have the perfect room for you.
              </p>
              <p>
                Our team is dedicated to ensuring a smooth and hassle-free experience for our clients. We strive to maintain high-quality standards, transparency, and excellent customer service.
              </p>
              <p>
                Thank you for choosing Gharbhada. We look forward to helping you find your home away from home.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;

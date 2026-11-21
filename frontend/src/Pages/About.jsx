import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import cotton from "../images/cotton.png";
import wind from "../images/wind.png";
import groupIcon from "../images/groupIcon.png";
import "../css/About.css"; 

const About = () => {
  return (
    <>
      <div className="about-header text-center py-4 mb-4">
        <h1>About Us</h1>
        <p>
          <a href="/" className="home-link">Home</a> / About Us
        </p>
      </div>

      <div className="about-story text-center px-3">
        <h2>Our Story</h2>
        <h3>
          Welcome to Amla Shop! 👗✨ <br /><br />
          We are two passionate friends based in Germany who love fashion and quality clothing.<br /><br />
          For the past two years, we have been curating and bringing you a selection of stylish and branded pieces, all chosen with care and attention to detail.<br /><br />
          Our mission is simple: to make you feel confident, stylish, and unique in every outfit.<br /><br />
          Even though we do not have a physical store, we make sure your online shopping experience is smooth, safe, and personal.<br /><br />
          At Amla Shop, fashion meets passion and we are here to help you express yourself through what you wear.
        </h3>
      </div>

      <Container className="about-info my-5">
        <Row className="align-items-center">
          <Col xs={12} md={6} className="text-center mb-4 mb-md-0">
            <img
              src={groupIcon}
              alt="Our Team"
              className="img-fluid about-img"
            />
          </Col>
          <Col xs={12} md={6} className="about-text">
            <h6>Our Product Quality</h6>
            <h2>We Make Things Comfy, Pretty, and Fancy</h2>
            <p>
              We carefully select each item to ensure it is stylish, comfortable, and made from high-quality materials. Your satisfaction is our priority.
            </p>

            <Row>
              <Col xs={6} className="d-flex flex-column align-items-center mb-3">
                <img src={cotton} alt="Cotton" />
                <h6>100% Cotton</h6>
                <p>Soft, durable, and natural fabric for all-day comfort.</p>
              </Col>
              <Col xs={6} className="d-flex flex-column align-items-center mb-3">
                <img src={wind} alt="Breathable" />
                <h6>Breathable Fabric</h6>
                <p>Keeps you cool and comfortable no matter the occasion.</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;

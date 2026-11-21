import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const Contact = () => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    sms: "",
  });

  const [sent, setSent] = useState(false); 

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/addContact", contact);
      console.log("Added contact");
      setSent(true); 
      setContact({ firstName: "", lastName: "", email: "", sms: "" }); 
    } catch (err) {
      console.log("Not added contact", err);
      alert("Error sending message. Please try again.");
    }
  };

  return (
    <div style={{ background: "#f8f8f8", minHeight: "100vh", paddingBottom: "50px" }}>
      <div className="text-center py-4 mb-4" style={{ background: "#e3dedeff", width: "100%" }}>
        <h1>Contact Us</h1>
        <p>
          <a href="/" style={{ textDecoration: "none", color: "black" }}>Home</a> / Contact Us
        </p>
      </div>

      <Container>
        <Row className="justify-content-center">
          <Col md={6} style={{ marginRight: "20px" }}>
            <h4>Get in Touch</h4>
            <p style={{ color: "gray", fontSize: "14px", marginBottom: "30px" }}>
              Your email address will not be published. Required fields are marked*
            </p>

            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>First Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="Ex. John"
                      value={contact.firstName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Last Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={contact.lastName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={contact.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Your Message *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="sms"
                  placeholder="Enter here..."
                  value={contact.sms}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                style={{ backgroundColor: "#401C0B", border: "none", padding: "10px 20px" }}
              >
                Send Message
              </Button>
            </Form>

            {sent && (
              <div style={{ marginTop: "20px" }}>
                <Button variant="success" disabled>
                  Message Sent Successfully 
                </Button>
              </div>
            )}
          </Col>

          <Col md={4} className="mt-5 mt-md-0" style={{ background: "#e3dedeff", padding: "30px", borderRadius: "0px", height: "auto" }}>
            <div style={{ marginBottom: "40px" }}>
              <h5>Address</h5>
              <p>Frankfurt, Germany</p>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <h5>Contact</h5>
              <p>Phone : +0123-456-789</p>
              <p>Email : example@gmail.com</p>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <h5>Open Time - Online</h5>
              <p>Monday - Sunday : 8:00 - 22:00</p>
            </div>

            <div style={{ marginTop: "40px" }}>
              <h5>Stay Connected</h5>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px", fontSize: "18px" }}>
                {["facebook-f", "instagram", "tiktok"].map((icon, i) => (
                  <div key={i} style={{ backgroundColor: "#f28b1dd0", borderRadius: "50%", width: "35px", height: "35px", display: "flex", alignItems: "center", justifyContent: "center", color: "black" }}>
                    <i className={`fa-brands fa-${icon}`}></i>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;









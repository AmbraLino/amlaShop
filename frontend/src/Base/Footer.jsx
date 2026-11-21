import React from "react";
import "../css/footer.css";
import { Button } from "react-bootstrap";
import mail from "../images/mail.png";
import logo from '../images/logo.jpeg';
import payment from "../images/payment.png";
import headphone from "../images/headphone.png";
import shipping from "../images/shipping.png";

const Footer = () => {

 const features = [
    {
      img: shipping,
      title: "Free Shipping",
      text: "Free shipping for order above $180",
    },
    {
      img: payment,
      title: "Flexible Payment",
      text: "Multiple secure payment options",
    },
    {
      img: headphone,
      title: "24x7 Support",
      text: "We support online all days",
    },
  ];
return(
  <>
    <div
      className="features-container"
      style={{ width: "100%", marginTop: "100px"}}
    >
      {features.map((feature, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            minWidth: "200px",
          }}
        >
          
          <img
            src={feature.img}
            alt={feature.title}
            style={{ width: "40px", height: "40px", objectFit: "contain" }}
          />

          
          <div>
            <h6 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>
              {feature.title}
            </h6>
            <p style={{ fontSize: "12px", margin: 0, color: "black" }}>
              {feature.text}
            </p>
          </div>
        </div>
      ))}
    </div>
    
      <div className="footer">
        <div className="footer-top">
          <div className="footer-left">
        
            <h1><img
                        src={logo}
                        width="35"
                        height="35"
                        alt="logo"
                        className="me-2 rounded-circle"
                      />
                      Amla shop</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam,
              odit!
            </p>

            <div className="info">
              <div className="fb" >
                <i className="fa-brands fa-facebook-f" ></i>
                 <a href="https://www.facebook.com"></a>
              </div>
              <div className="ig">
                <i className="fa-brands fa-instagram"></i>
              </div>
              <div className="tt">
                <i className="fa-brands fa-tiktok"></i>
              </div>
            </div>
          </div>

          <div className="footer-right">
            <div className="company">
              <h3 className="title">Company</h3>
                <p>
                <a href="/about" style={{ textDecoration: "none", color: "white" }}>
                  About Us
                </a>
              </p>
              <p>Blog</p>
              <p>
                <a href="/contact" style={{ textDecoration: "none", color: "white" }}>
                  Contact Us
                </a>
              </p>
            </div>

            <div className="contact">
              <h3 className="title"><a href ="/contact" style={{ textDecoration: "none", color: "white" }}>
                  Contact Info
                </a></h3>
              <p>+0123-456-789</p>
              <p>amlashop@gmail.com</p>
              <p>Germany</p>
            </div>
          </div>
        </div>

        <hr />

        <div className="terms">
          <p>
            Copyright &copy; 2024 - {new Date().getFullYear()} Amla Shop
            Clothing
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;



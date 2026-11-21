import React from "react";
import { Container } from "react-bootstrap";

const TopBar = () => {
  return (
    <div
      style={{
        backgroundColor: "#401C0B",
        color: "#ffffff",
        fontSize: "14px",
        padding: "6px 0",
      }}
    >
      <Container
        className="d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start"
        style={{ gap: "5px" }}
      >
        <div>Support (406) 555-0120</div>
        <div>
          Sign up and <strong>GET 25% OFF</strong> for your first order.{" "}
          <a
            href="/register"
            style={{
              color: "#FFD700",
              textDecoration: "underline",
              marginLeft: "5px",
            }}
          >
            Sign up now
          </a>
        </div>
      </Container>
    </div>
  );
};

export default TopBar;

import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import axios from "axios";

const ReadOne = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const [item, setItem] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/readOne/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error("Error fetching data: " + err);
      }
    };
    getData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      navigate("/"); 
    } catch (err) {
      console.error("Error deleting data: " + err);
    }
  };

  const isOwner = userInfo.email && item.ownerItem === userInfo.id;

  return (
    <Container className="my-5">
      <Row>
        <Col xs={12} md={6}>
          <h1>Data</h1>
          <h2>{item.name}</h2>
          <p>{item.description}</p>

          {isOwner && (
            <div className="d-flex gap-2">
              <Link to={`/update/${item._id}`}>
                <Button variant="warning">Update</Button>
              </Link>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          )}
        </Col>

        <Col xs={12} md={6}>
          <h1>Image</h1>
          {item.photo ? (
            <Image
              src={`http://localhost:5000/images/${item.photo}`}
              alt="Uploaded"
              rounded
              className="img-fluid"
            />
          ) : (
            <p>No image uploaded.</p>
          )}
        </Col>
      </Row>
      <Card className="border-2 border-dark-subtle" style={{ width: "400px" }}>
        <Card.Img
          variant="top"
          src={`http://localhost:5000/images/${item.photo}`}
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReadOne;

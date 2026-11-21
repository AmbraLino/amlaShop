import React, { useState, useContext } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../Auth/UserContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  const [newItem, setNewItem] = useState({ name: "", description: "", photo: null });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [createdItem, setCreatedItem] = useState(null);


  const handleChange = (e) => setNewItem({ ...newItem, [e.target.name]: e.target.value });
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setNewItem({ ...newItem, photo: file });
    setUploadedImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo || userInfo.role !== "admin") {
      alert("Only admin can add products!");
      return;
    }

    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("description", Number(newItem.description));
    formData.append("photo", newItem.photo);
    formData.append("userId", userInfo.id); 

    try {
      const res = await axios.post("http://localhost:5000/api/users/addItem", formData);
      setCreatedItem(res.data);
      setNewItem({ name: "", description: "", photo: null });
      setUploadedImage(null);
      alert("Product added successfully!");
      navigate("/shop");
    } catch (err) {
      // console.error("Error adding product:", err);
      alert("Error adding the product.");
    }
  };

  return (
    <Container className="my-5">
      {userInfo && userInfo.email ? (
        <Row>
          <Col md={6}>
            <h1>Create Product</h1>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="description"
                  value={newItem.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="photo">
                <Form.Label>Photo</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handlePhoto} required />
              </Form.Group>

              <Button type="submit" style={{background:"#401C0B"}}>Add Product</Button>
            </Form>
          </Col>

          <Col md={6}>
            <h1>Preview</h1>
            {(uploadedImage || createdItem) && (
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={uploadedImage ? uploadedImage : `http://localhost:5000/images/${createdItem.photo}`}
                   style={{ height: 100, width:"100%", objectFit: "contain", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}

                />
                <Card.Body>
                  <Card.Title>{newItem.name || createdItem?.name || "Product Name"}</Card.Title>
                  <Card.Text>
                    ${newItem.description || createdItem?.description || "0"}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      ) : (
        <p>You must be an admin to add products.</p>
      )}
    </Container>
  );
};

export default Create;


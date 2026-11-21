import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../Auth/UserContext';
import axios from 'axios';

const UpdateOne = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { userInfo } = useContext(UserContext);

  const [updateItem, setUpdateItem] = useState({
    name: '',
    description: '',
    photo: '',
  });
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/items/${id}`);
        const { name, description, photo } = res.data;
        setUpdateItem({
          name: name || '',
          description: description || '',
          photo: photo || ''
        });
      } catch (err) {
        console.log('Data not showing ' + err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateItem(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setUpdateItem(prev => ({ ...prev, photo: file }));
    setUploadedImage(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", updateItem.name);
    formData.append("description", Number(updateItem.description));
    if (updateItem.photo instanceof File) formData.append("photo", updateItem.photo);

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/items/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Updated:", res.data);
      nav('/adminPanel');
    } catch (err) {
      console.log("Data not updated " + err);
    }
  };

  if (!userInfo || userInfo.role !== "admin") {
    return <p className="text-center mt-5">You do not have permission to edit this item.</p>;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <h1>Update Product</h1>
          <Form onSubmit={handleUpdate} encType='multipart/form-data'>
            
            <Form.Group className="mb-3" controlId="nameItem">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updateItem.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="description"
                value={updateItem.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="photoItem">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                accept=".jpeg,.jpg,.png"
                onChange={handlePhoto}
              />
            </Form.Group>

            <Button variant="warning" type="submit">Update</Button>
          </Form>
        </Col>

        <Col md={6}>
          <h1>Preview</h1>
          {(updateItem.name || updateItem.description || uploadedImage || updateItem.photo) ? (
            <Card style={{ width: '18rem' }}>
              {uploadedImage ? (
                <Card.Img variant="top" src={uploadedImage} />
              ) : updateItem.photo ? (
                <Card.Img variant="top" src={`http://localhost:5000/images/${updateItem.photo}`} />
              ) : null}
              <Card.Body>
                <Card.Title>{updateItem.name}</Card.Title>
                <Card.Text>
                  ${updateItem.description || 0}
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <p>No preview available</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateOne;

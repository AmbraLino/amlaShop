import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (userInfo?.role !== "admin") return;
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/items");
        setProducts(res.data || []);
      } catch (err) {
        console.log("Error fetching items:", err);
      }
    };
    fetchItems();
  }, [userInfo]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log("Error deleting item:", err);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updateOne/${id}`);
  };

  if (!userInfo || userInfo.role !== "admin") {
    return <p className="text-center mt-5">You do not have access to this page.</p>;
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Admin Panel - Manage Items</h2>
      <Row className="g-4">
        {products.length === 0 ? (
          <p>No items yet.</p>
        ) : (
          products.map((item) => (
            <Col md={4} key={item._id}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/images/${item.photo}`}
                  style={{ height: 200, width:"100%", objectFit: "contain", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
                <Card.Body className="text-center">
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text style={{ minHeight: 40 }}>
                    ${item.description}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="warning" onClick={() => handleUpdate(item._id)}>
                      Update
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(item._id)}>
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default AdminPanel;




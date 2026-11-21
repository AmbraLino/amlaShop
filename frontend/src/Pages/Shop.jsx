import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { CartContext } from "../CartContext";
import photo1 from "../images/rosedress.png";
import photo2 from "../images/whitedress.png";
import photo3 from "../images/widejeans.png";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  const staticPhotos = [
    { _id: "s1", img: photo1, title: "Rose Dress", description: "50" },
    { _id: "s2", img: photo2, title: "Wine Dress", description: "40" },
    { _id: "s3",img: photo3, title: "Wide Jeans", description: "100" },
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/items");
        setProducts(res.data || []);
      } catch (err) {
        console.log("Error fetching products:", err);
        setProducts([]);
      }
    };
    fetchItems();
  }, []);

  const handleAddToCart = (item) => {
    const price = parseFloat((item.description || "0").replace(/[^0-9.]/g, "")) || 0;
    addToCart({
      _id: item._id || item.id,
      name: item.name || item.title,
      photo: item.photo || item.img,
      description: item.description || "0",
      price,
      quantity: 1,
      size: null,
    });
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Shop Our Collection</h2>

      <Row className="g-4 mb-5">
        {staticPhotos.map((item, i) => {
          const price = parseFloat(item.description.replace(/[^0-9.]/g, "")) || 0;
          return (
            <Col md={4} key={`static-${i}`}>
              <Card className="h-100 border-1" style={{ borderRadius: 12 }}>
                <Card.Img
                  variant="top"
                  src={item.img}
                  style={{ height: 250,  width: "100%",objectFit: "contain", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
                <Card.Body className="text-center">
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">${price}</Card.Subtitle>
                  <Button style={{ background: "#401C0B", color: "white" }} onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      {products.length === 0 ? (
        <p style={{ margin: "0 16px" }}>No products yet.</p>
      ) : (
        <Row className="g-4">
          {products.map((item) => {
            const price = parseFloat((item.description || "0").replace(/[^0-9.]/g, "")) || 0;
            return (
              <Col md={4} key={item._id}>
                <Card className="h-100 border-1" style={{ borderRadius: 12 }}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/images/${item.photo}`}
                     style={{ height: 200, width:"100%", objectFit: "contain", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}

                  />
                  <Card.Body className="text-center">
                    <Card.Title>{item.name || "Unnamed Product"}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">${price}</Card.Subtitle>
                    <Button style={{ backgroundColor: "#401C0B", color: "#fff", borderRadius: 9 }} onClick={() => handleAddToCart(item)}>
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default Shop;

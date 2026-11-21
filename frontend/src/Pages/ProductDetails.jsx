import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Table, Nav, Card } from "react-bootstrap";
import { CartContext } from "../CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("XXL");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("additional");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/items/${id}`);
        setProduct(res.data);
        if (res.data?.photo) {
          setSelectedImage(`http://localhost:5000/images/${res.data.photo}`);
        }

        const relatedRes = await axios.get("http://localhost:5000/api/items");
        const filtered = (relatedRes.data || []).filter((item) => item._id !== id);
        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductData();
  }, [id]);

  if (loading) return <Container className="py-5 text-center">Loading...</Container>;
  if (!product) return <Container className="py-5 text-center">Product not found.</Container>;

  const photoUrl = selectedImage || `http://localhost:5000/images/${product.photo}`;
  const rawPrice = parseFloat(product.price || product.description) || 0;
  const originalPrice = product.originalPrice || rawPrice * 2; 
  const sizes = Array.isArray(product.size) 
    ? product.size 
    : (product.size ? product.size.split(",") : ["S", "M", "L", "XL", "XXL", "XXXL"]);

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name || product.title || "Product",
      photo: product.photo,
      price: rawPrice,
      quantity: quantity,
      size: selectedSize,
    });
  };

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <h3>Product Details</h3>
        <p className="text-muted small">Home / Shop / Coats / Product Details</p>
      </div>
      <Row className="mb-5">
        <Col md={6}>
          <div className="mb-3 text-center border rounded p-3" style={{ backgroundColor: "#f8f9fa" }}>
            <img
              src={photoUrl}
              alt={product.name}
              className="img-fluid"
              style={{ maxHeight: "420px", objectFit: "contain" }}
            />
          </div>
          <Row className="g-2">
            {[1, 2, 3, 4].map((_, index) => (
              <Col key={index} xs={3}>
                <img
                  src={photoUrl}
                  alt="thumbnail"
                  className="img-thumbnail cursor-pointer"
                  style={{ height: "80px", width: "100%", objectFit: "cover", cursor: "pointer" }}
                  onClick={() => setSelectedImage(photoUrl)}
                />
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={6}>
          <span className="text-muted small">{product.category || "Coats"}</span>
          <h2 className="fw-bold">{product.name || product.title || "Trendy Brown Coat"}</h2>
          
          <div className="d-flex align-items-center mb-2">
            <span className="text-warning me-2">★★★★★</span>
            <span className="text-muted small">4.8 (245 Reviews)</span>
          </div>

          <div className="d-flex align-items-center mb-3">
            <h3 className="fw-bold me-3 mb-0">${rawPrice.toFixed(2)}</h3>
            <span className="text-decoration-line-through text-muted">${originalPrice.toFixed(2)}</span>
          </div>

          <p className="text-muted small">
            {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
          </p>

          <div className="mb-3">
            <div className="fw-bold mb-2">Size : {selectedSize}</div>
            <div className="d-flex gap-2 flex-wrap">
              {sizes.map((sz) => {
                const cleanSize = sz.trim();
                const isSelected = selectedSize === cleanSize;
                return (
                  <Button
                    key={cleanSize}
                    variant={isSelected ? "warning" : "outline-secondary"}
                    size="sm"
                    style={{ minWidth: "45px" }}
                    onClick={() => setSelectedSize(cleanSize)}
                  >
                    {cleanSize}
                  </Button>
                );
              })}
            </div>
            <small className="text-muted text-decoration-underline mt-1 d-block" style={{ cursor: "pointer" }}>
              View Size Guide
            </small>
          </div>

          {/* Sasia & Butonat */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="d-flex align-items-center border rounded">
              <Button
                variant="light"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </Button>
              <span className="px-3 fw-bold">{quantity}</span>
              <Button
                variant="light"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </Button>
            </div>

            <Button
              style={{ backgroundColor: "#401C0B", borderColor: "#401C0B", color: "#fff" }}
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>

            <Button variant="warning" style={{ color: "#000" }}>
              Buy Now
            </Button>
          </div>

          {/* Meta Info */}
          <div className="small text-muted border-top pt-3">
            <div><strong>SKU:</strong> {product.sku || product._id}</div>
            <div><strong>Tags:</strong> {product.tags || "Women, Coat, Fashion"}</div>
          </div>
        </Col>
      </Row>

      {/* Tabs - Description / Additional Information / Review */}
      <Nav
        variant="tabs"
        activeKey={activeTab}
        onSelect={(selectedKey) => setActiveTab(selectedKey)}
        className="justify-content-center mb-4"
      >
        <Nav.Item>
          <Nav.Link eventKey="description">Description</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="additional">Additional Information</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="review">Review</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Tab Content */}
      {activeTab === "description" && (
        <div className="p-3 border rounded mb-5">
          <p>{product.longDescription || product.description || "No description available."}</p>
        </div>
      )}

      {activeTab === "additional" && (
        <Table bordered responsive className="mb-5">
          <thead style={{ backgroundColor: "#F7C35F" }}>
            <tr>
              <th style={{ width: "30%", backgroundColor: "#f5b731", color: "#000" }}>Feature</th>
              <th style={{ backgroundColor: "#f5b731", color: "#000" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-bold">Material</td>
              <td>{product.material || "Cotton"}</td>
            </tr>
            <tr>
              <td className="fw-bold">Size</td>
              <td>{Array.isArray(sizes) ? sizes.join(", ") : product.size || "S, M, L, XL, XXL, XXXL"}</td>
            </tr>
            <tr>
              <td className="fw-bold">Color</td>
              <td>{product.color || "Brown, Grey, Green, Red, Blue"}</td>
            </tr>
            <tr>
              <td className="fw-bold">Country of Origin</td>
              <td>{product.countryOfOrigin || "United States"}</td>
            </tr>
            <tr>
              <td className="fw-bold">Brand</td>
              <td>{product.brand || "KD Design"}</td>
            </tr>
          </tbody>
        </Table>
      )}

      {activeTab === "review" && (
        <div className="p-3 border rounded mb-5 text-center text-muted">
          No reviews yet. Be the first to review!
        </div>
      )}

      {/* Explore Related Products */}
      <div className="mt-5">
        <h4 className="text-center fw-bold mb-4">Explore Related Products</h4>
        <Row className="g-4">
          {relatedProducts.slice(0, 4).map((item) => {
            const price = parseFloat(item.price || item.description) || 0;
            return (
              <Col key={item._id} xs={12} sm={6} md={3}>
                <Card className="h-100 border-0 shadow-sm text-center">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/images/${item.photo}`}
                    style={{ height: "220px", objectFit: "contain", padding: "10px" }}
                  />
                  <Card.Body>
                    <Card.Title className="fs-6">{item.name || item.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-dark fw-bold">${price}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </Container>
  );
};

export default ProductDetails;
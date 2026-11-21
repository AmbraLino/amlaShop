import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { Button, Container, Row, Col, Image, Form } from "react-bootstrap";
import "./css/cartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useContext(CartContext);
  const [coupon, setCoupon] = useState("");

  const safeCart = cart.map(item => ({
    ...item,
    price: Number(item.price) || 0,
    quantity: Number(item.quantity) || 0
  }));

  const totalItems = safeCart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = safeCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const taxes = 0;
  const total = subtotal + shipping + taxes;

  return (
    <Container className="my-5 cart-container">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {safeCart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <Row className="cart-row">
          <Col md={8} className="cart-items-col">
            <div className="table-responsive">
              <table className="table custom-table">
                <thead className="custom-thead">
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {safeCart.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div className="cart-product">
                          <Image
                            src={item.photo || "https://via.placeholder.com/50"}
                            rounded
                            className="cart-product-img"
                          />
                          <div>
                            <div>{item.name}</div>
                            {item.description && <small>{item.description}</small>}
                          </div>
                        </div>
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>
                        <div className="quantity-control">
                          <Button onClick={() => decreaseQty(item._id)}>−</Button>
                          <span>{item.quantity}</span>
                          <Button onClick={() => increaseQty(item._id)}>+</Button>
                        </div>
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
  <Button
    onClick={() => removeFromCart(item._id)}
    style={{
      borderRadius: 0,
      backgroundColor: "#401C0B",
      border: "none",
      color: "#fff",  
      padding: "2px 8px",
      fontWeight: "bold"
    }}
  >×</Button>
</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 cart-actions">
              <Form className="d-flex align-items-center coupon-form">
                <Form.Control
                  type="text"
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <Button>Apply Coupon</Button>
              </Form>

              <span onClick={clearCart} className="clear-cart">Clear Cart</span>
            </div>
          </Col>

          <Col md={4} className="cart-summary-col">
            <div className="order-summary">
              <h4>Order Summary</h4>
              <div className="summary-item"><span>Items:</span><span>{totalItems}</span></div>
              <div className="summary-item"><span>Sub Total:</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="summary-item"><span>Shipping:</span><span>${shipping.toFixed(2)}</span></div>
              <div className="summary-item"><span>Taxes:</span><span>${taxes.toFixed(2)}</span></div>
              <hr />
              <div className="summary-item total"><strong>Total:</strong><strong>${total.toFixed(2)}</strong></div>
              <Button className="checkout-btn">Proceed to Checkout</Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartPage;


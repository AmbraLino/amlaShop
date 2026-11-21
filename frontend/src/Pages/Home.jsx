import React, { useRef } from "react";
import { Container, Card, Button } from "react-bootstrap";
import firstPicture from "../images/firstPicture.PNG";
import photo1 from "../images/rosedress.png";
import photo2 from "../images/whitedress.png";
import photo3 from "../images/widejeans.png";
import photo4 from "../images/spotdress.png";
import photo5 from "../images/greencampus.png";
import photo6 from "../images/michaelkorsbag.png";
import "../css/CategoriesSection.css";

function Home() {
  const deals = [
     { img: photo1, title: "Rose Dress", price: 75, oldPrice: 150 },
{ img: photo2, title: "White Dress",  price: 80, oldPrice: 100 },
 { img: photo3, title: "Wide Jeans",  price: 60, oldPrice: 120 },
   { img: photo4, title: "Spot Dress",  price: 90, oldPrice: 180 },
      { img: photo5, title: "Green Campus",  price: 90, oldPrice: 180 },
   { img: photo6, title: "Michael Kors Bag",  price: 90, oldPrice: 180 },

  ];

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div style={{ background: "#f7f4f4" }}>
      
      <Card className="home-carousel">
        <div className="carousel-text">
          <Card.Title className="discount-badge">
            <div className="discount-circle">%</div>
            <strong>50% OFF</strong> Summer Super Sale
          </Card.Title>

          <Card.Text className="carousel-main-text">
            Step into Style: Your Ultimate Fashion Destination
          </Card.Text>

          <Card.Text className="carousel-subtext">
            Discover the new arrivals for women. Trendy styles at great prices!
          </Card.Text>

          <Button variant="warning" href="/shop" className="shop-btn">
            Shop Now
          </Button>
        </div>

        <div className="carousel-img-wrapper">
          <img src={firstPicture} alt="collection" className="carousel-img" />
        </div>
      </Card>

      <Container className="my-5">
        <div className="text-center mb-4">
          <h2>Deals of the Day</h2>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
        </div>

        <div style={{ position: "relative" }}>
          <div ref={sliderRef} className="deals-slider">
            {deals.map((deal, idx) => (
              <Card key={idx} className="deal-card">
                <Card.Img variant="top" src={deal.img} className="deal-img" style={{ height: 250,  width: "100%",objectFit: "contain", borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
                <Card.Body>
                  <Card.Subtitle className="mb-1 text-muted">{deal.category}</Card.Subtitle>
                  <Card.Title>{deal.title}</Card.Title>
                  <Card.Text>
                    <strong>${deal.price}</strong>{" "}
                    <span style={{ textDecoration: "line-through", color: "#888" }}>
                      ${deal.oldPrice}
                    </span>
                  </Card.Text>
                  <Button className="deal-btn">
                    <a href="/shop" style={{ color: "white", textDecoration: "none" }}>Shop Now →</a>
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>

          <div className="slider-buttons">
            <Button className="arrow-btn" onClick={scrollLeft}>←</Button>
            <Button className="arrow-btn" onClick={scrollRight}>→</Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;


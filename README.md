# amlaShop

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js), allowing users to browse products, view item details, and get in touch through an integrated contact system.

## Features
- **Product Catalog:** Browse available items with images and product details managed via RESTful APIs.
- **Image Handling:** Backend support for product image storage and serving (`backend/images`).
- **Contact System:** Interactive contact form connected to MongoDB (`contactModel` & `contactRoute`) for customer inquiries.
- **Modular Architecture:** Separated `frontend` and `backend` directories for clean development and scalability.

## Tech Stack
- **Frontend:** React, JavaScript (ES6+), HTML5, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)

## Project Structure
```text
amlaShop/
├── backend/
│   ├── images/        # Uploaded product images
│   ├── models/        # Mongoose schemas (e.g., contactModel.js)
│   ├── routes/        # Express API routes (itemRoute.js, contactRoute.js)
│   └── server.js      # Entry point & server configuration
├── frontend/          # Client-side React application
└── README.md
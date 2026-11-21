const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const path = require("path");

const contactRoute = require("./routes/contactRoute.js");
const userRoute = require("./routes/userRoute.js"); 
const itemRoute = require("./routes/itemRoute.js");
require("dotenv").config();

const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
    exposedHeaders: ["set-cookie"],
}));

app.use(session({
    secret: "This will be secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));


userRoute(app);
itemRoute(app);   
app.use("/", contactRoute);


app.get("/", (req, res) => res.send("Hello World"));

app.listen(5000, () => console.log("Server running on port 5000"));

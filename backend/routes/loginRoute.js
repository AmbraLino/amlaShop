// const express = require("express");
// const router = express.Router();
// const userModel = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");

// const secret = "asdfe45we45w345wegw345werjktjwertkjfdgfgfsgf";

// router.use(cookieParser());

// router.post("/", async (req, res) => {
//     try {
//         const userData = req.body;
//         const findUser = await userModel.findOne({ email: userData.email });
//         if (!findUser) return res.status(404).send("User not found");

//         const passOk = bcrypt.compareSync(userData.password, findUser.password);
//         if (!passOk) return res.status(400).send("Invalid credentials");

//         const token = jwt.sign({ id: findUser._id, email: findUser.email, role: findUser.role }, secret);
//         res.cookie("token", token, { httpOnly: true }).json({
//             id: findUser._id,
//             email: findUser.email,
//             role: findUser.role,
//         });
//     } catch (err) {
//         res.status(500).send("Something went wrong: " + err);
//     }
// });

// module.exports = router;


// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
// const userModel = require("./models/user");

// const secret = "asdfe45we45w345wegw345werjktjwertkjfdgfgfsgf";

// app.use(express.json());
// app.use(cookieParser());
// app.use(require("cors")({
//   origin: "http://localhost:3000",
//   credentials: true,
// }));

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const findUser = await userModel.findOne({ email });

//     if (!findUser) {
//       return res.status(404).send("User not found");
//     }

//     const passOk = bcrypt.compareSync(password, findUser.password);
//     if (!passOk) {
//       return res.status(400).send("Invalid credentials");
//     }

//     const token = jwt.sign(
//       { id: findUser._id, email: findUser.email, role: findUser.role },
//       secret
//     );

//     res
//       .cookie("token", token, { httpOnly: true })
//       .json({
//         id: findUser._id,
//         email: findUser.email,
//         role: findUser.role,
//       });
//   } catch (err) {
//     res.status(500).send("Something went wrong: " + err);
//   }
// });

// app.get("/user", async (req, res) => {
//   try {
//     const { token } = req.cookies;
//     if (!token) return res.status(401).send("Unauthorized");

//     const decoded = jwt.verify(token, secret);
//     const user = await userModel.findById(decoded.id);

//     if (!user) return res.status(404).send("User not found");

//     res.json({
//       id: user._id,
//       email: user.email,
//       role: user.role,
//     });
//   } catch (err) {
//     res.status(401).send("Invalid token");
//   }
// });

// app.post("/logout", (req, res) => {
//   res.clearCookie("token").send("Logged out");
// });

// mongoose.connect("mongodb://localhost:27017/amlaDB")
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(5000, () => console.log("Server running on port 5000"));
//   })
//   .catch(err => console.log("DB connection error:", err));

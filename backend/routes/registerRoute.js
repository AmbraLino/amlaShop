// const express = require("express");
// const router = express.Router();
// const userModel = require("../models/user");
// const bcrypt = require("bcrypt");

// const salt = bcrypt.genSaltSync(10);

// router.post("/", async (req, res) => {
//     try {
//         const { username, email, password, role } = req.body;

//         if (!username || !email || !password) {
//             return res.status(400).send("All fields are required");
//         }

//         if (password.length < 3) {
//             return res.status(400).send("Password too short");
//         }

//         const existingUser = await userModel.findOne({ email });
//         if (existingUser) return res.status(400).send("User already exists");

//         let newUser = new userModel({
//             username: userInfo.username,
//             email: userInfo.email,
//             password: bcrypt.hashSync(userInfo.password, salt),
//             role: userInfo.role || "user",
//         });

//         await newUser.save();
//         res.status(201).send("User created");
//     } catch (err) {
//         res.status(500).send("Error: " + err);
//     }
// });

// module.exports = router;

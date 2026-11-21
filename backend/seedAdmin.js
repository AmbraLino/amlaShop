const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const salt = bcrypt.genSaltSync(10);
const createAdmin = async () => {
  try {
    await mongoose.connect("connection with DB");
    const adminEmail = "adminAmla@admin.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin already exists");
      mongoose.disconnect();
      return;
    }
    const admin = new User({
      username: "admin",
      email: "Amla@admin.com",
      password: bcrypt.hashSync("adminAmla123", salt),
      role: "admin",
    });
    await admin.save();
    console.log("Admin user created:", admin.email);
    mongoose.disconnect();
  } catch (err) {
    console.log("Not created admin " + err);
    process.exit(1);
  }
};
createAdmin();
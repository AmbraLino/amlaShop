const ItemModel = require("../models/itemModel");
const userModel = require("../models/user");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

module.exports = (app) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "images"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
  });
  const fileFilter = (req, file, cb) => {const ItemModel = require("../models/itemModel");
const userModel = require("../models/user");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

module.exports = (app) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "images"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
  });

  const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    cb(null, allowed.includes(file.mimetype));
  };

  const upload = multer({ storage, fileFilter });

  // console.log("Item routes loaded"); 
  app.post("/api/users/addItem", upload.single("photo"), async (req, res) => {
    try {
      const userId = req.body.userId;
      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) 
        return res.status(400).send("Invalid userId");

      const user = await userModel.findById(userId);
      if (!user) return res.status(404).send("User not found");
      if (user.role !== "admin") return res.status(403).send("Only admin can add items");

      const newItem = new ItemModel({
        ...req.body,
        photo: req.file.filename,
        ownerItem: userId,
      });
      await newItem.save();
      res.status(200).json(newItem);
    } catch (err) {
      console.log(err);
      res.status(500).send("Not added item");
    }
  });

  app.get("/api/items", async (req, res) => {
    try {
      const allItems = await ItemModel.find({});
      res.status(200).json(allItems);
    } catch (err) {
      console.log(err);
      res.status(500).send("Not read items");
    }
  });

  app.get("/api/items/:id", async (req, res) => {
    try {
      const item = await ItemModel.findById(req.params.id);
      if (!item) return res.status(404).send("Item not found");
      res.status(200).json(item);
    } catch (err) {
      console.log(err);
      res.status(500).send("Not read item");
    }
  });

  app.delete("/api/items/:id", async (req, res) => {
    try {
      const deleted = await ItemModel.deleteOne({ _id: req.params.id });
      if (deleted.deletedCount === 0) return res.status(404).send("Item not found");
      res.status(200).send("Item deleted successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("Not deleted");
    }
  });

  app.patch("/api/items/:id", upload.single("photo"), async (req, res) => {
    try {
      const updateData = { ...req.body };
      if (req.file) updateData.photo = req.file.filename;

      const updatedItem = await ItemModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true }
      );

      if (!updatedItem) return res.status(404).send("Item not found");
      res.status(200).json(updatedItem);
    } catch (err) {
      console.log(err);
      res.status(500).send("Not updated");
    }
  });
};

    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    cb(null, allowed.includes(file.mimetype));
  };
  const upload = multer({ storage, fileFilter });

  
  app.post("/api/users/addItem", upload.single("photo"), async (req, res) => {
    try {
      const userId = req.body.userId;
      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send("Invalid userId");

      const user = await userModel.findById(userId);
      if (!user) return res.status(404).send("User not found");
      if (user.role !== "admin") return res.status(403).send("Only admin can add items");

      const newItem = new ItemModel({
        ...req.body,
        photo: req.file.filename,
        ownerItem: userId,
      });
      await newItem.save();
      res.status(200).json(newItem);
    } catch (err) {
      console.log(err);
      res.status(500).send("Not added item");
    }
  });

  app.get("/readItems", async (req, res) => {
    try {
      const allItem = await ItemModel.find({});
      res.status(200).send(allItem);
    } catch (err) {
      console.log(err);
      res.status(500).send("Not read items");
    }
  });

  app.get("/readOneItem/:id", async (req, res) => {
    try {
      const oneItem = await ItemModel.findById(req.params.id);
      res.status(200).send(oneItem);
    } catch (err) {
      console.log(err);
      res.status(500).send("Not read items");
    }
  });

  app.get("/deleteOneItem/:id", async (req, res) => {
    try {
      await ItemModel.deleteOne({ _id: req.params.id });
      res.status(200).send("Deleted");
    } catch (err) {
      console.log(err);
      res.status(500).send("Not deleted");
    }
  });

  app.patch("/updateItem/:id", upload.single("photo"), async (req, res) => {
    try {
      let infoItem = { ...req.body };
      if (req.file) infoItem.photo = req.file.filename;

      const updateItem = await ItemModel.findByIdAndUpdate(
        req.params.id,
        { $set: infoItem },
        { new: true }
      );
      res.status(200).send(updateItem);
    } catch (err) {
      console.log(err);
      res.status(500).send("Not updated");
    }
  });
};
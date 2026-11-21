const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const cookieParser = require('cookie-parser');

const secret = 'asdfe45we45w345wegw345werjktjwertkjfdgfgfsgf';

module.exports = (app) => {
  app.use(cookieParser());

  app.post('/api/users/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      if (!username || !email || !password) return res.status(400).send("Fields are empty");
      if (password.length < 3) return res.status(400).send("Short password");

      const foundUser = await userModel.findOne({ email });
      if (foundUser) return res.status(400).send("This user exists");

      const newUser = new userModel({
        username,
        email,
        password: bcrypt.hashSync(password, salt),
        role: role || "user",
      });
      await newUser.save();
      res.status(200).json(newUser);
    } catch (err) {
      res.status(500).send("Something is wrong " + err);
    }
  });

  app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) return res.status(404).send('User not found');

    const passOk = bcrypt.compareSync(password, findUser.password);
    if (!passOk) return res.status(400).send('Invalid credentials');

    jwt.sign({ email: findUser.email, id: findUser._id, role: findUser.role }, secret, {}, (err, token) => {
      if (err) return res.status(500).send("Something is wrong");
      res.cookie('token', token, { httpOnly: true }).json({
        id: findUser._id,
        email: findUser.email,
        role: findUser.role,
      });
    });
  });

  app.get('/api/users/user', (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).send('Unauthorized');

    jwt.verify(token, secret, {}, (err, info) => {
      if (err) return res.status(401).send('Unauthorized');
      res.json(info);
    });
  });

  app.post('/api/users/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0), httpOnly: true }).json('ok');
  });
};

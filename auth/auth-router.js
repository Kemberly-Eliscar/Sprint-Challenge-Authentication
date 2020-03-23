const express = require('express')
const bcrypt = require("bcryptjs");
const { generateToken } = require('../api/generateToken')
const users = require("./auth-model")
const router = express.Router()

router.post('/register', async (req, res) => {
  // implement registration
  try {
    const auth = await users.add(req.body);
    res.status(201).json({ message: "User has been successfully registered.", auth})
  } catch (error) {
    next(error)
  }
});

router.post('/login', async (req, res, next) => {
  // implement login
  try {
    const { username, password } = req.body
    const user = await users.findBy({ username }).first()
    const passwordValid = await bcrypt.compare(password, user.password)

    if (user && passwordValid) {
      const token = generateToken(user);
      res.status(200).json({ 
        message: `Welcome, ${user.username}!`, token})
    } else {
      res.status(401).json({ message: "Please try to login again!"})
    }
  } catch (error) {
    next(error)
  }
});

module.exports = router;

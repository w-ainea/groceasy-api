const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.send('Home page');
});

router.post('/register', (req, res) => {
  res.send('Register');
});

router.post('/login', (req, res) => {
  res.send('Login');
});

module.exports = router;

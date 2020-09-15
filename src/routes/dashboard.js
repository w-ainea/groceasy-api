const express = require('express');

const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.send('Dashboard Page');
});

router.get('/products', (req, res) => {
  res.send('Products Page');
});

module.exports = router;

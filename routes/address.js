const express = require('express');
const router = express.Router();
var controller = require('../controllers/address.js');

// Task 2
router.get("/I/want/title1/", controller.getTitles);
// Task 3
router.get("/I/want/title2/", controller.getTitlesRSVP);

module.exports = router;

"use strict";
const express = require('express');
const router = express.Router();
const promotionsController = require('../controllers/promotionsController');
// Route to get all promotions
router.get('/', promotionsController.getPromotions);
// Route to create a new promotion
router.post('/', promotionsController.createPromotion);
// Route to update a promotion
router.put('/:id', promotionsController.updatePromotion);
// Route to delete a promotion
router.delete('/:id', promotionsController.deletePromotion);
module.exports = router;

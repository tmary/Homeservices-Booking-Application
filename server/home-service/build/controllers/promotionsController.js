"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Promotion = require('../model/promotion');
exports.getPromotions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promotions = yield Promotion.find();
        res.json(promotions);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const promotionData = req.body;
    try {
        const newPromotion = yield Promotion.create(promotionData);
        res.status(201).json(newPromotion);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updatePromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Promotion.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: 'Promotion updated successfully' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.deletePromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Promotion.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Promotion deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

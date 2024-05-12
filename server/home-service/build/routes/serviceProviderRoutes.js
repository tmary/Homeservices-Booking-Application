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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../controllers/authMiddleware");
const serviceAreas_1 = require("../model/serviceAreas");
const router = express_1.default.Router();
// Retrieve all service providers
router.get('/service-areas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(serviceAreas_1.serviceAreas);
}));
// Create a service provider
router.post('/service-areas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newServiceArea = req.body;
    serviceAreas_1.serviceAreas.push(newServiceArea);
    res.status(201).json(newServiceArea);
}));
// Update an existing service provider
router.put('/service-areas/:id', authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const updatedServiceAreas = req.body;
    const index = serviceAreas_1.serviceAreas.findIndex(provider => provider.id === id);
    if (index !== -1) {
        serviceAreas_1.serviceAreas[index] = Object.assign(Object.assign({}, serviceAreas_1.serviceAreas[index]), updatedServiceAreas);
        res.status(200).json([serviceAreas_1.serviceAreas[index]]);
    }
    else {
        res.status(404).send('Service provider not found');
    }
}));
// Delete a service provider
router.delete('/service-areas/:id', authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const index = serviceAreas_1.serviceAreas.findIndex(provider => provider.id === id);
    if (index !== -1) {
        serviceAreas_1.serviceAreas.splice(index, 1);
        res.status(204).send();
    }
    else {
        res.status(404).send('Service provider not found');
    }
}));
exports.default = router;

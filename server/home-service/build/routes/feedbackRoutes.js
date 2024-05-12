"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../controllers/authMiddleware");
const authMiddleware_2 = require("../controllers/authMiddleware");
const router = express_1.default.Router();
// Mock Data 
let feedbacks = [
    { id: 1, serviceId: 101, message: 'Great service!', rating: 5, timestamp: new Date(), response: '' },
    { id: 2, serviceId: 102, message: 'Average experience.', rating: 3, timestamp: new Date(), response: '' },
];
// Get all feedback
router.get('/', (req, res) => {
    res.json(feedbacks);
});
// Submit new feedback
router.post('/', (req, res) => {
    const newFeedback = {
        id: feedbacks.length + 1,
        serviceId: req.body.serviceId,
        message: req.body.message,
        rating: req.body.rating,
        timestamp: new Date(),
        response: ''
    };
    feedbacks.push(newFeedback);
    res.status(201).json(newFeedback);
});
// Update a feedback response by ID (admin only)
router.put('/:id/response', authMiddleware_1.authMiddleware, authMiddleware_2.isAdmin, (req, res) => {
    const feedbackId = parseInt(req.params.id, 10);
    const feedback = feedbacks.find(f => f.id === feedbackId);
    if (!feedback) {
        return res.status(404).json({ error: 'Feedback not found' });
    }
    feedback.response = req.body.response;
    res.status(200).json(feedback);
});
exports.default = router;

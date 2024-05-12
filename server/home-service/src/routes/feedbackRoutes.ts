import express, { Request, Response, Router} from 'express';
import { Feedback } from "../model/feedback";
import { authMiddleware } from "../controllers/authMiddleware";
import { isAdmin } from '../controllers/authMiddleware';

const router = express.Router();


// Mock Data 
let feedbacks : Feedback[] = [
    { id: 1, serviceId: 101, message: 'Great service!', rating: 5, timestamp: new Date(), response: '' },
    { id: 2, serviceId: 102, message: 'Average experience.', rating: 3, timestamp: new Date(), response: '' },
  ];

// Get all feedback
router.get('/', (req:Request, res:Response) => {
  res.json(feedbacks);
});

// Submit new feedback
router.post('/', (req, res) => {
  const newFeedback: Feedback = {
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
router.put('/:id/response', authMiddleware, isAdmin, (req, res) => {
  const feedbackId = parseInt(req.params.id, 10);
  const feedback = feedbacks.find(f => f.id === feedbackId);

  if (!feedback) {
    return res.status(404).json({ error: 'Feedback not found' });
  }

  feedback.response = req.body.response;
  res.status(200).json(feedback);
});

export default  router;

import express, { Request, Response } from 'express';
import { authMiddleware, isUser, isAdmin, isVisitor } from '../controllers/authMiddleware';
import { UserController } from '../controllers/userController';
import { serviceAreas } from '../model/serviceAreas';

const router = express.Router();

// Retrieve all service providers
router.get('/service-areas',  async (req: Request, res: Response) => {
    res.json(serviceAreas);
});

// Create a service provider
router.post('/service-areas' ,async (req: Request, res: Response) => {
    const newServiceArea = req.body;
    serviceAreas.push(newServiceArea);
    res.status(201).json(newServiceArea);
});

// Update an existing service provider
router.put('/service-areas/:id',authMiddleware,isAdmin, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updatedServiceAreas = req.body;

    const index = serviceAreas.findIndex(provider => provider.id === id);
    if (index !== -1) {
        serviceAreas[index] = { ...serviceAreas[index], ...updatedServiceAreas };
        res.status(200).json([serviceAreas[index]]);
    } else {
        res.status(404).send('Service provider not found');
    }
});

// Delete a service provider
router.delete('/service-areas/:id',authMiddleware, isAdmin, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = serviceAreas.findIndex(provider => provider.id === id);
    if (index !== -1) {
        serviceAreas.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Service provider not found');
    }
});

export default router;

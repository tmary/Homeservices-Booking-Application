import express, { Request, Response } from 'express';
import { authMiddleware } from '../controllers/authMiddleware';
import { UserController } from '../controllers/userController';
import { Booking, IBooking } from '../model/booking';

interface CustomRequest extends Request {
    decoded?: { userId: string }; // Modify this according to your actual decoded token structure
}

const router = express.Router();

let bookings: any[] = []; // Assuming you have a data structure to store bookings

// Create a new booking
router.post('/bookings',  async (req: CustomRequest, res: Response) => {
    const userId = req.decoded?.userId;
    const newBookingData = { ...req.body, userId: userId };
    try {
        const newBooking = await Booking.create(newBookingData);
        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
});

// Retrieve all bookings
router.get('/bookings', async (req: CustomRequest, res: Response) => {
    const userId = req.decoded?.userId;
    try {
        const userBookings = await Booking.find({ userId: userId });
        res.json(userBookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Retrieve a specific booking by ID
router.get('/bookings/:id', async (req: CustomRequest, res: Response) => {
    const userId = req.decoded?.userId;
    const bookingId = req.params.id;
    try {
        const booking = await Booking.findOne({ _id: bookingId, userId: userId });
        if (booking) {
            res.json(booking);
        } else {
            res.status(404).send('Booking not found');
        }
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update an existing booking
router.put('/bookings/:id', async (req: CustomRequest, res: Response) => {
    const userId = req.decoded?.userId;
    const bookingId = req.params.id;
    const updatedBookingData = req.body;
    try {
        const updatedBooking = await Booking.findOneAndUpdate({ _id: bookingId, userId: userId }, updatedBookingData, { new: true });
        if (updatedBooking) {
            res.json(updatedBooking);
        } else {
            res.status(404).send('Booking not found');
        }
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a booking
router.delete('/bookings/:id', authMiddleware, async (req: CustomRequest, res: Response) => {
    const userId = req.decoded?.userId;
    const bookingId = req.params.id;
    try {
        const deletedBooking = await Booking.findOneAndDelete({ _id: bookingId, userId: userId });
        if (deletedBooking) {
            res.status(204).send();
        } else {
            res.status(404).send('Booking not found');
        }
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;

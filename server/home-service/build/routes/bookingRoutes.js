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
const booking_1 = require("../model/booking");
const router = express_1.default.Router();
let bookings = [];
// Create a new booking
router.post('/bookings', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.decoded) === null || _a === void 0 ? void 0 : _a.userId;
    const newBookingData = Object.assign(Object.assign({}, req.body), { userId: userId });
    try {
        const newBooking = yield booking_1.Booking.create(newBookingData);
        res.status(201).json(newBooking);
    }
    catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
}));
// Retrieve all bookings
router.get('/bookings', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.decoded) === null || _b === void 0 ? void 0 : _b.userId;
    try {
        const userBookings = yield booking_1.Booking.find({ userId: userId });
        res.json(userBookings);
    }
    catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// Retrieve a specific booking by ID
router.get('/bookings/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = (_c = req.decoded) === null || _c === void 0 ? void 0 : _c.userId;
    const bookingId = req.params.id;
    try {
        const booking = yield booking_1.Booking.findOne({ _id: bookingId, userId: userId });
        if (booking) {
            res.json(booking);
        }
        else {
            res.status(404).send('Booking not found');
        }
    }
    catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// Update an existing booking
router.put('/bookings/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const userId = (_d = req.decoded) === null || _d === void 0 ? void 0 : _d.userId;
    const bookingId = req.params.id;
    const updatedBookingData = req.body;
    try {
        const updatedBooking = yield booking_1.Booking.findOneAndUpdate({ _id: bookingId, userId: userId }, updatedBookingData, { new: true });
        if (updatedBooking) {
            res.json(updatedBooking);
        }
        else {
            res.status(404).send('Booking not found');
        }
    }
    catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// Delete a booking
router.delete('/bookings/:id', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const userId = (_e = req.decoded) === null || _e === void 0 ? void 0 : _e.userId;
    const bookingId = req.params.id;
    try {
        const deletedBooking = yield booking_1.Booking.findOneAndDelete({ _id: bookingId, userId: userId });
        if (deletedBooking) {
            res.status(204).send();
        }
        else {
            res.status(404).send('Booking not found');
        }
    }
    catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
exports.default = router;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../model/User");
class UserController {
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch user data from the database based on the decoded user ID
                const userId = req.decoded._id;
                const user = yield User_1.User.findById(userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                // Send the user data as a response
                res.status(200).json(user);
            }
            catch (error) {
                console.error('Error fetching user:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extract updated user data from the request body
                const { firstName, lastName, address } = req.body;
                // Fetch user data from the database based on the decoded user ID
                const userId = req.decoded._id;
                const user = yield User_1.User.findById(userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                // Update user data
                user.firstName = firstName;
                user.lastName = lastName;
                user.address = address;
                // Save the updated user data
                yield user.save();
                // Send a success response
                res.status(200).json({ message: 'User updated successfully', user });
            }
            catch (error) {
                console.error('Error updating user:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
}
exports.UserController = UserController;

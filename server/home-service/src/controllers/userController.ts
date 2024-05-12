import { Request, Response } from 'express';
import { User } from '../model/User'; 
import { Jwt } from 'jsonwebtoken';

interface CustomRequest extends Request {
    decoded?: any;
}


export class UserController {
    static async getUser(req:CustomRequest, res: Response) {
        try {
            // Fetch user data from the database based on the decoded user ID
            const userId = req.decoded._id;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Send the user data as a response
            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async updateUser(req:CustomRequest, res: Response) {
        try {
            // Extract updated user data from the request body
            const { firstName, lastName, address } = req.body;

            // Fetch user data from the database based on the decoded user ID
            const userId = req.decoded._id;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update user data
            user.firstName = firstName;
            user.lastName = lastName;
            user.address = address;

            // Save the updated user data
            await user.save();

            // Send a success response
            res.status(200).json({ message: 'User updated successfully', user });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    
}

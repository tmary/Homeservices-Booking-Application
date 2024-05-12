import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
var jwt = require('jsonwebtoken');


const SALT_FACTOR = 10;

export interface IUser extends Document {
    email: string;
    password: string;
    lastName?: string;
    firstName?: string;
    address?: string; 
    role: 'admin' | 'user'| 'visitor';
    comparePassword(candidatePassword: string, callback: (err: any, isMatch: boolean) => void): void;
    isAdmin: () => boolean;
    generateJWT: () => string;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
   
    email: { type: String, required: true, unique: true},
    lastName: { type: String},
    firstName: { type: String},
    address: { type: String},
    password: { type: String, required: true},
    role: { type: String, enum:['admin', 'user', 'visitor'], default: 'user'}
    
});



UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }
    next();

});

UserSchema.methods.comparePassword = function (candidatePassword:any, callback:any){
    bcrypt.compare(candidatePassword, this.password,(err, isMatch) => {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};
UserSchema.methods.isAdmin = function() {
    return this.role === 'admin';
};

UserSchema.methods.generateJWT = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role,
        exp: Math.floor(expiry.getTime()/1000), 
        
    },'My_secret');

};

export const User = mongoose.model<IUser>('User', UserSchema);




import { PassportStatic } from 'passport';
import { Strategy  } from 'passport-local';
import { User,IUser } from '../model/User';
import { Express } from 'express'; 
import { Request } from 'express';
import jwt  from 'jsonwebtoken';

var passport = require('passport');
var mongoose = require('mongoose');


export const configurePassport = (passport: PassportStatic): PassportStatic => {

    passport.serializeUser((user: Express.User, done) => {
        console.log('user is serialized.');
        done(null, user);
    });

    passport.deserializeUser((user: Express.User, done) => {
        console.log('user is deserialized.');
        done(null, user);
    });

    passport.use('local', new Strategy((username, password, done) => {
        const query = User.findOne({ email: username });
        query.then(user => {
            if (user) {
                user.comparePassword(password, (error, _) => {
                    if (error) {
                        done('Incorrect username or password.');
                    } else {
                        done(null, user._id);
                    }
                });
            } else {
                done(null, undefined);
            }
        }).catch(error => {
            done(error);
        })
    }));
    return passport;
}

export const generateJWT = ( user: IUser): string => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() +7);

    return jwt.sign({
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        address: user.address,
        exp: parseInt((expiry.getTime()/1000).toString()),
        role:user.role,
    }, 'My_secret');
}
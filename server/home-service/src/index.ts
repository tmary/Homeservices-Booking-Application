
import express from 'express';
import { configureRoutes } from './routes/routes';
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { configurePassport } from './passport/passport';
import cors , {CorsOptions} from 'cors';
import  serviceProvidersRoutes from './routes/serviceProviderRoutes'; 
import expressSession from 'express-session';
import bookingRoutes from './routes/bookingRoutes'
import feedbackRoutes from './routes/feedbackRoutes'

const app = express();
app.use(cors());
const port = 3000;
const dbUrl = 'mongodb://localhost:4000/homeservice-db';

//mongodb connection
mongoose.connect(dbUrl).then((_) => {
    console.log('Successfully connected to MongoDB.');
}).catch(error => {
    console.log(error);
    return;
});

// Configure express-session middleware

const whiteList = ['*','http://localhost:4200'];
const corsOption = {
    origin:function(origin: string | undefined, callback:  (err: Error | null, allowed?: boolean) => void){
        if (whiteList.indexOf(origin!) !== -1 || whiteList.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true
};

app.use(cors(corsOption));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/app', serviceProvidersRoutes);
app.use('/app/feedbacks', feedbackRoutes);
app.use('/app', bookingRoutes);

//cookies
app.use(cookieParser());


const sessionOptions = {
    secret: 'homeservice',
    resave: false,
    saveUninitialized: false 
};
app.use(expressSession(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use('/app', configureRoutes(passport, express.Router()));


passport.serializeUser((user: Express.User, done) => {
    console.log('User is serialized.');
    done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
    console.log('user is deserilaized.');
    done(null, user);
});




// Configure express-session middleware

app.listen(port, () => {
    console.log('Server is listening on port .3000............');
});

console.log('After server is ready.');




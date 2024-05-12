"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_2 = require("./passport/passport");
const cors_1 = __importDefault(require("cors"));
const serviceProviderRoutes_1 = __importDefault(require("./routes/serviceProviderRoutes"));
const express_session_1 = __importDefault(require("express-session"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const feedbackRoutes_1 = __importDefault(require("./routes/feedbackRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 3000;
const dbUrl = 'mongodb://localhost:4000/homeservice-db';
//mongodb connection
mongoose_1.default.connect(dbUrl).then((_) => {
    console.log('Successfully connected to MongoDB.');
}).catch(error => {
    console.log(error);
    return;
});
// Configure express-session middleware
const whiteList = ['*', 'http://localhost:4200'];
const corsOption = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || whiteList.includes('*')) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true
};
app.use((0, cors_1.default)(corsOption));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/app', serviceProviderRoutes_1.default);
app.use('/app/feedbacks', feedbackRoutes_1.default);
app.use('/app', bookingRoutes_1.default);
//cookies
app.use((0, cookie_parser_1.default)());
const sessionOptions = {
    secret: 'homeservice',
    resave: false,
    saveUninitialized: false
};
app.use((0, express_session_1.default)(sessionOptions));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, passport_2.configurePassport)(passport_1.default);
app.use('/app', (0, routes_1.configureRoutes)(passport_1.default, express_1.default.Router()));
passport_1.default.serializeUser((user, done) => {
    console.log('User is serialized.');
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    console.log('user is deserilaized.');
    done(null, user);
});
// Configure express-session middleware
app.listen(port, () => {
    console.log('Server is listening on port .3000............');
});
console.log('After server is ready.');

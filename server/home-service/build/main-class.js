"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainClass = void 0;
const rxjs_1 = require("rxjs");
class MainClass {
    constructor() {
        this.securityThreshold = 70;
        console.log('It Works.');
    }
    greeting() {
        return "Hello, World";
    }
    //Promise (callback)
    greetingPromise() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const randAvailability = Math.random() * 100;
                if (randAvailability < this.securityThreshold) {
                    reject("Error: Availability is  " + randAvailability.toString() + '%');
                }
                else {
                    resolve("Successful request, availability is : " + randAvailability.toString() + '%');
                }
            }, 2000);
        });
    }
    // Observable callback 
    greetingObservable() {
        let counter = 0;
        return new rxjs_1.Observable((subscriber) => {
            subscriber.next('Waiting for response from database...n');
            const interval = setInterval(() => {
                const randAvailability = Math.random() * 100;
                if (randAvailability < this.securityThreshold) {
                    //bad (error)
                    subscriber.error("Error: Availability is  " + randAvailability.toString() + '%');
                }
                else {
                    // good (next)
                    subscriber.next("Successful request, availability is : " + randAvailability.toString() + '%');
                    //subscriber.complete();
                }
                counter++;
                if (counter == 5) {
                    clearInterval(interval);
                    subscriber.complete();
                }
            }, 2000);
        });
    }
}
exports.MainClass = MainClass;

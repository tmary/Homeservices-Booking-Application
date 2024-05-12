import { Observable, Subscriber } from 'rxjs';
export class MainClass {

    securityThreshold = 70;
    constructor() {
        console.log('It Works.');
    }
    greeting(){
        return "Hello, World";
    }
    //Promise (callback)
    greetingPromise(): Promise<string>{
        return new Promise((resolve, reject) => {   // name of the callbacks ...resolve and reject
            setTimeout(() => {
            const randAvailability = Math.random() * 100;
            if (randAvailability < this.securityThreshold) {
                reject("Error: Availability is  " + randAvailability.toString() + '%');
            } else {
                resolve("Successful request, availability is : " + randAvailability.toString() + '%');
            }
        }, 2000);
        });
    }
     // Observable callback 
    greetingObservable():Observable<string>{
        let counter = 0;
        return new  Observable((subscriber: Subscriber<string>) => {
            subscriber.next('Waiting for response from database...n');
            const interval = setInterval(() => {
                const randAvailability = Math.random() * 100;
            if (randAvailability < this.securityThreshold) {
             //bad (error)
                subscriber.error("Error: Availability is  " + randAvailability.toString() + '%');

            } else {
              // good (next)
                subscriber.next("Successful request, availability is : " + randAvailability.toString() + '%');
                //subscriber.complete();
            }
            counter++;
            if (counter == 5){
                clearInterval(interval);
                subscriber.complete();
            }

            },2000);
            
        });

    }
}
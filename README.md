# Home Service Booking App

The Home Service Booking App is a full-stack web application designed for managing and booking home services. It caters to three user roles: service providers (admin), homeowners (users), and visitors. This project is built using the MEAN stack (MongoDB, ExpressJS, Angular, Node.js).

System Architecture
Backend
The server is implemented with ExpressJS and handles REST API requests, performing CRUD operations with MongoDB. It includes user authentication and session management.

Frontend
The frontend is built with Angular and interacts with the backend via HTTP REST API calls, displaying data and providing interactive UI for CRUD operations.

Database
MongoDB hosts the application data with four primary entities: Service Providers, Services, Bookings, and Users. It includes demo data for initial setup and visualization.

Deployment
Additional notes on how to deploy the application on a live system will be added here.

Built With
MongoDB
ExpressJS
Angular
Node.js
## Features

- **Service Providers (Admins)**
  - List services, availability, and rates
  - Manage bookings and service areas
  - Offer promotions and respond to feedback
  - Track earnings

- **Homeowners (Users)**
  - Register to book services
  - View service history
  - Rate providers and schedule recurring services

- **Visitors**
  - Browse services and read reviews
  - Registration required for booking

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB
- Angular CLI

```bash
npm install -g @angular/cli

git clone https://github.com/your-username/home-service-booking-app.git
cd home-service-booking-app


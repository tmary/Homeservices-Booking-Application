export interface User {
    username: string;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    password: string;
    exp: number;
    iat: number;
}

export interface NotificationPreferences {
  newBooking: boolean;
  bookingConfirmation: boolean;
  userReview: boolean;
}

export interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  lastName?:  string;
  firstName?: string;
  isAdmin?: boolean;
}

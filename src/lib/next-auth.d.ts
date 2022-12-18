import 'next-auth';

// "Declare module" allows you to add custom types and interfaces in the next-auth library
// It will extend from the existing interfaces
declare module 'next-auth' {

    interface Session {
        user: User;
    }
    interface User {
        id: string;
        username: string;
    }
}
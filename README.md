# NEX Message.

**Nex Message is a full stack chat messaging application using Next.js, Chakra UI, GraphQL, Prisma, & MongoDB**

This project was created to experiment with websockets and creating my own websocket server! 😆
During this project I was able to learn to use the Prisma ORM to access my MongoDB database.
I also learnt how to create GraphQL Queries, Mutations, and Subscriptions for my websocket connections.

Please use this link to demo the live site!
https://nex-message.vercel.app/

## Project Screenshot
![image](https://user-images.githubusercontent.com/71597829/212443667-3e46fcdf-5b5b-4c93-9e8d-ed9dc7421bda.png)


## Current Features
- Create chat rooms
- Google Accounts 
- Group Chats
- Deleting rooms

## Tech Stack
![Next.js](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Chakra UI](https://img.shields.io/static/v1?style=for-the-badge&message=Chakra+UI&color=319795&logo=Chakra+UI&logoColor=FFFFFF&label=)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![MongoDB](https://img.shields.io/static/v1?style=for-the-badge&message=MongoDB&color=47A248&logo=MongoDB&logoColor=FFFFFF&label=)
![Prisma](https://img.shields.io/static/v1?style=for-the-badge&message=Prisma&color=2D3748&logo=Prisma&logoColor=FFFFFF&label=)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## Installation

1. Clone this repository.
```$ git clone https://git@github.com:nickhuynhq/nex-message.git```


2. Run `npm install` from inside the client directory.
```bash
$ cd nex-message
$ npm install
```

3. Create your own .env.local file
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=<YOUR SECRET KEY>

BACKEND_URL=<URL OF THE BACKEND>

GOOGLE_CLIENT_ID=<YOUR ID HERE>
GOOGLE_CLIENT_SECRET=<YOUR SECRET KEY>

MONGODB_URI=<YOUR MONGODB URI>
```

4. Generate Prisma Schema

```bash
$ npx prisma generate --schema=src/prisma/schema.prisma
```

5. Run the app

```bash
$ npm run dev
```

## Author

Nicholas Huynh [@nickhuynhq](https://github.com/nickhuynhq)

![Swag](http://ForTheBadge.com/images/badges/built-with-swag.svg)

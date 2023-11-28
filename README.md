# Frontend Mentor - Link-sharing app solution

This is a solution to the [Link-sharing app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [The challenge](#the-challenge)
- [Preview](#preview)
- [Links](#links)
- [How to run locally](#how-to-run-locally)
- [Built with](#built-with)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Deployment](#deployment)
- [Author](#author)

### The challenge

- Users should login to the app
- Create, read, update, delete links and see their previews with form validation
- Save their details to a database
- Drag and drop links to reorder them
- Add profile details, profile picture upload
- Preview their devlinks profile and copy the link to their clipboard to share
- Full responsiveness

### Preview

![](./preview.jpg)

### Links

- Solution URL (TBD): [Link Sharing App](https://vercel.com)

### How to run locally

- Download [Node.js](https://nodejs.org/en/download/)
- Download [pnpm](https://pnpm.io/installation)
- Clone the repo
- For a local database, download `Docker` and run `docker-compose up -d` to start a postgres container
- Check `.env.example` to add the required environment variables to a `.env` file
- Run `pnpm install` to install dependencies
- Run `pnpm db:push` to push your schema to the database
  - You might get an env variable error, add NODE_ENV=development to the .env file
- Run `pnpm dev` to start the development server
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Built with

#### Frontend

- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Typescript](https://www.typescriptlang.org/) - For type checking
- [Tailwind] (https://tailwindcss.com/) - For page styles
- [React Query](https://react-query.tanstack.com/) - implemented in tRPC
- [Formik] (https://formik.org/) - For form management
- [Zod] (https://zod.dev/) - For validation

#### Backend

- [TRPC] (https://trpc.io/) - For server-client communication
- [Drizzle] (https://orm.drizzle.team/) - DB ORM, postgres, supabase
- [NextAuth] (https://next-auth.js.org/) - For authentication

#### Deployment

- [Vercel] (https://vercel.com/) - For deployment
- [PlanetScale] (https://planetscale.com/) - For database hosting

### Author

- LinkedIn - [Donato Di Zenzo](https://www.linkedin.com/in/donato-di-zenzo/)
- Frontend Mentor - [@dodiz](https://www.frontendmentor.io/profile/dodiz)

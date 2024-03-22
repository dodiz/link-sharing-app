# Frontend Mentor - Link-sharing app solution

This is a solution to the [Link-sharing app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [The challenge](#the-challenge)
- [Preview](#preview)
- [Links](#links)
- [How to run locally](#how-to-run-locally)
- [Built with](#built-with)
  - [Stack](#frontend)
  - [Deployment](#deployment)
- [Author](#author)

### The challenge

- Users should login to the app
- Create, read, update, delete social links and see their previews with form validation
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
- Setup a db on [Neon](https://neon.tech/) and add the connection string to the .env file
- Setup a [Github OAuth app](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) and add the client id and secret to the .env file
- Setup a [Uploadthing](https://uploadthing.com/) account and add the api key to the .env file
- Check `.env.example` for var names.
- Run `pnpm install` to install dependencies
- Run `pnpm db:push` to push your schema to the database
- Run `pnpm dev` to start the development server
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Built with

#### Stack

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind] (https://tailwindcss.com/)
- [React Query](https://react-query.tanstack.com/) - implemented in tRPC
- [Formik] (https://formik.org/)
- [Zod] (https://zod.dev/) - validation library
- [tRPC] (https://trpc.io/) - For server-client communication
- [Drizzle] (https://orm.drizzle.team/) - DB ORM, postgres
- [NextAuth] (https://next-auth.js.org/)

#### Services

- [Vercel] (https://vercel.com/) - deployment
- [Neon] (https://neon.tech/) - postgres db
- [Uploadthing] (https://uploadthing.com/) - image upload

### Author

- LinkedIn - [Donato Di Zenzo](https://www.linkedin.com/in/donato-di-zenzo/)
- Frontend Mentor - [@dodiz](https://www.frontendmentor.io/profile/dodiz)

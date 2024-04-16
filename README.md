# LMS Next + Tailwind + Clerk + Prisma

## Getting Started

```bash
npm i
```

## Database: MySQL

- Use version: 8.0.X
- Set up on Mac: https://www.geeksforgeeks.org/how-to-install-mysql-on-macos/
- Leveraging MySQL specifically for search integration with Prisma
  - https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search#mysql-1

## Clerk

- After account creation access your environment keys: https://clerk-docs-git-prettier-fixes.clerkpreview.com/quickstarts/nextjs/stable#set-environment-keys
- After logging in to this application the first time via Clerk a user will be created for you.
- In the Clerk Dashboard you can click `Users` in the side navigation and click on the user for yourself.
- In your user profile you can find your `User ID` which can be copied into the environment variables for the project as the `MAINTAINER_ID`.

## Environment Variables

- Create a .env file with the following values

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_GETFROMCLERK
CLERK_SECRET_KEY=sk_test_GETFROMCLERK
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE

NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_MAINTAINER_ID=user_GETFROMCLERKAFTERLOGGINGIN
```

## Prisma Commands

- Initialize Prisma on Project: `npx prisma init`
- Update Types and Definitions" `npx prisma generate`
- Update your DB Schema: `npx prisma db push`
- See your DB data: `npx prisma studio`

## Running Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Other Integrations

- Tiptap
- React Dropzone
- React Hook Form
- Zod
- Shadcn
- Hello Pangea Drag n Drop

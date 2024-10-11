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
- Keep track of your user, password, host, port, and database
- Most default setups will be:
  - user: root
  - password: Whatever you set when you started MySQL
  - host: localhost
  - port: 3306
  - data: Whatever you decided to name the one you created

## Clerk

- After account creation access your environment keys: https://clerk.com/docs/quickstarts/nextjs#set-your-environment-variables
- Click on "Configure" then scroll to "Developers" and choose "API Keys"
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

## Seed our DB Categories
```bash
npm run seed
```

## Running Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Other Integrations

- Tiptap - https://tiptap.dev/docs/editor/examples/default
- React Dropzone - https://react-dropzone.js.org/
- React Hook Form - https://react-hook-form.com/
- Zod - https://zod.dev/
- Shadcn - https://ui.shadcn.com/
- Hello Pangea Drag n Drop - https://dnd.hellopangea.com/

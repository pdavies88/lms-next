# LMS Next + Tailwind + Clerk + Prisma

## Getting Started

```bash
npm i
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

- Create a .env file with the following values

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=GETFROMCLERK
CLERK_SECRET_KEY=GETFROMCLERK
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

DATABASE_URL=GETFROMDATABASE

NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_MAINTAINER_ID=GETFROMCLERKAFTERLOGGINGIN
```

## Prisma Commands

- Initialize Prisma on Project: `npx prisma init`
- Update Types and Definitions" `npx prisma generate`
- Update your DB Schema: `npx prisma db push`
- See your DB data: `npx prisma studio`

## Other Integrations

- Tiptap
- React Dropzone
- React Hook Form
- Zod
- Shadcn
- Hello Pangea Drag n Drop

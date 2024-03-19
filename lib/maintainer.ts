// SWITCH TO CLERK ORG ROLES
// https://clerk.com/docs/references/nextjs/auth#use-auth-to-check-your-current-user-s-role
export const isMaintainer = (userId?: string | null) => {
  return userId === process.env.NEXT_PUBLIC_MAINTAINER_ID;
};

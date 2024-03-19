import { isMaintainer } from '@/lib/maintainer';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const MaintainerLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!isMaintainer(userId)) {
    return redirect('/');
  }

  return <>{children}</>;
};

export default MaintainerLayout;

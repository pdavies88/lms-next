'use client';

import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isMaintainerPage = pathname?.startsWith('/maintainer');
  const isPlayerPage = pathname?.includes('/chapter');
  return (
    <div className='flex gap-x-2 ml-auto'>
      {isMaintainerPage || isPlayerPage ? (
        <Link href='/'>
          <Button size='sm' variant='ghost'>
            <LogOut className='h-4 w-4 mr-2' />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href='/maintainer/courses'>
          <Button size='sm' variant='ghost'>
            Maintainer mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl='/' />
    </div>
  );
};

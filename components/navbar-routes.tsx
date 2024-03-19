'use client';

import { UserButton, useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { SearchInput } from './search-input';
import { isMaintainer } from '@/lib/maintainer';

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isMaintainerPage = pathname?.startsWith('/maintainer');
  const isCoursePage = pathname?.includes('/courses');
  const isSearchPage = pathname === '/search';
  return (
    <>
      {isSearchPage && (
        <div className='hidden md:block'>
          <SearchInput />
        </div>
      )}
      <div className='flex gap-x-2 ml-auto'>
        {isMaintainerPage || isCoursePage ? (
          <Link href='/'>
            <Button size='sm' variant='ghost'>
              <LogOut className='h-4 w-4 mr-2' />
              Exit
            </Button>
          </Link>
        ) : isMaintainer(userId) ? (
          <Link href='/maintainer/courses'>
            <Button size='sm' variant='ghost'>
              Maintainer mode
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl='/' />
      </div>
    </>
  );
};

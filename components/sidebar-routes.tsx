'use client';

import { BarChart, Compass, Layout, List } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { SidebarItem } from './sidebar-item';

const guestRoutes = [
  {
    icon: Layout,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/search',
  },
];

const maintainerRoutes = [
  {
    icon: List,
    label: 'Courses',
    href: '/maintainer/courses',
  },
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/maintainer/analytics',
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isMaintainerPage = pathname?.includes('/maintainer');

  const routes = isMaintainerPage ? maintainerRoutes : guestRoutes;

  return (
    <div className='flex flex-col w-full'>
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

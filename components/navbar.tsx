import { NavbarRoutes } from './navbar-routes';
import { MobileSidebar } from './mobile-sidebar';

export const Navbar = () => {
  return (
    <div className='p-4 border-b h-full flex items-center bg-white shadow-xs'>
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

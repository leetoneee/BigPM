import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  RectangleStackIcon,
  UsersIcon,
  UserIcon,
  BellIcon,
  ClipboardDocumentIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';

export const NavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  return [
    // {
    //   name: 'Dashboard',
    //   href: '/',
    //   icon: <Squares2X2Icon className="size-6" />,
    //   active: pathname === '/',
    //   position: 'top'
    // },
    {
      name: 'Projects',
      href: '/projects',
      icon: <RectangleStackIcon className="size-6" />,
      active: isNavItemActive(pathname, '/projects'),
      position: 'top'
    },
    {
      name: 'Staffs',
      href: '/staffs',
      icon: <UsersIcon className="size-6" />,
      active: isNavItemActive(pathname, '/staffs'),
      position: 'top'
    },
    {
      name: 'Rules',
      href: '/rules',
      icon: <ClipboardDocumentIcon className="size-6" />,
      active: isNavItemActive(pathname, '/rules'),
      position: 'top'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: <Cog6ToothIcon className="size-6" />,
      active: isNavItemActive(pathname, '/settings'),
      position: 'top'
    }
  ];
};

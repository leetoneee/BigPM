import { Breadcrumb } from '@/components';
import { Crumb } from '@/types';
import Image from 'next/image';

export default function Settings() {
  const crumbs: Crumb[] = [
    {
      label: 'Settings',
      href: '/settings'
    }
  ];
  
  return (
    <main className="flex flex-col items-center gap-8 p-3 sm:items-start">
      <Breadcrumb crumbs={crumbs}/>
    </main>
  );
}

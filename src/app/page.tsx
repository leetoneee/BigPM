import { Breadcrumb } from '@/components';
import { Crumb } from '@/types';
import Image from 'next/image';

export default function Dashboard() {

    const crumbs: Crumb[] = [
      {
        label: 'Dashboard',
        href: '/dashboard'
      }
    ];
    
  return (
    <main className="flex flex-col items-center gap-8 p-3 sm:items-start">
      <Breadcrumb crumbs={crumbs}/>
    </main>
  );
}

import { Breadcrumb } from '@/components';
import Image from 'next/image';
import Link from 'next/link';

export default function Settings() {
  return (
    <main className="flex flex-col items-center gap-8 p-3 sm:items-start">
      <Breadcrumb />
      <div className="mb-2 h-2 w-full border-b pt-2"></div>
    </main>
  );
}

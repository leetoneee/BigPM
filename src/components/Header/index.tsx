import React from 'react';
import Image from 'next/image';
import { BellIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="bg-white flex h-16 shrink-0 items-center justify-between px-4 drop-shadow md:px-6">
      <div className="flex flex-row items-center gap-4">
        <Image src="/icons/logo.svg" alt="logo" width={50} height={50} />
        <span className="text-on-primary text-lg font-semibold">BigPM</span>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <BellIcon className="size-6" />
        <div className="flex flex-col items-end">
          <span className="font-semibold">Lê Duy Nguyên</span>
          <span>Admin</span>
        </div>
        <div
          className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://avatar.iran.liara.run/public/50")'
          }}
        >
          <span className="sr-only">Marc Backes</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

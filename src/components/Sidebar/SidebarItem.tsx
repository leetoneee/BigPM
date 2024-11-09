// 'use client';

import Link from 'next/link';
import React from 'react';
import TooltipItem from '../Tooltip';
import { SidebarItemProps } from '@/types';
import { Tooltip } from '@nextui-org/react';

const SidebarItem = ({
  label,
  icon,
  path,
  active,
  isSidebarExpanded
}: SidebarItemProps) => {
  return (
    <>
      {isSidebarExpanded ? (
        <Link
          href={path}
          className={`relative flex h-full items-center whitespace-nowrap rounded-md ${
            active
              ? 'font-base bg-second-blue text-sm font-bold text-outline-focus shadow-sm'
              : 'text-outline hover:bg-second-blue hover:text-outline-focus/70'
          }`}
        >
          <div className="font-base relative flex flex-row items-center space-x-2 rounded-md px-2 py-2 text-sm duration-100">
            {icon}
            <span>{label}</span>
          </div>
        </Link>
      ) : (
        <Tooltip content={label} placement='right' >
          <Link
            href={path}
            className={`relative flex h-full items-center whitespace-nowrap rounded-md ${
              active
                ? 'bg-second-blue text-sm text-outline-focus'
                : 'text-outline hover:bg-second-blue hover:text-outline-focus/70'
            }`}
          >
            <div className="relative flex flex-row items-center space-x-2 rounded-md p-2 text-sm duration-100">
              {icon}
            </div>
          </Link>
        </Tooltip>
      )}
    </>
  );
};

export default SidebarItem;

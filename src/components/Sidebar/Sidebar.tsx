'use client';

import { Fragment, useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { classNames } from '../classNames';
import { NavItems } from './NavItems';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const navItems = NavItems();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="h-[100vh-64px]">
      <div
        className={classNames(
          isSidebarExpanded ? 'w-[200px]' : 'w-[68px]',
          'bg-accent border-on-primary hidden h-full transform drop-shadow transition-all duration-300 ease-in-out sm:flex'
        )}
      >
        <aside className="flex h-full w-full columns-1 flex-col overflow-x-hidden break-words px-4">
          {/* Top */}
          <div className="relative mt-4 pb-2">
            <div className="flex flex-col space-y-1">
              {navItems.map((item, idx) => {
                if (item.position !== 'bottom') {
                  return (
                    <Fragment key={idx}>
                      <div className="space-y-1">
                        <SidebarItem
                          label={item.name}
                          icon={item.icon}
                          path={item.href}
                          active={item.active}
                          isSidebarExpanded={isSidebarExpanded}
                        />
                      </div>
                    </Fragment>
                  );
                }
              })}
            </div>
          </div>
          {/* Bottom */}
          <div className="sticky bottom-0 mb-4 mt-auto block whitespace-nowrap transition duration-200">
            {navItems.map((item, idx) => {
              if (item.position === 'bottom') {
                return (
                  <Fragment key={idx}>
                    <div className="space-y-1">
                      <SidebarItem
                        label={item.name}
                        icon={item.icon}
                        path={item.href}
                        active={item.active}
                        isSidebarExpanded={isSidebarExpanded}
                      />
                    </div>
                  </Fragment>
                );
              }
            })}
          </div>
        </aside>
        <div className="relative mt-[calc(calc(90vh)-40px)]">
          <button
            type="button"
            className="border-muted-foreground/20 bg-primary absolute bottom-32 right-[-12px] flex h-6 w-6 items-center justify-center rounded-full border shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg"
            onClick={toggleSidebar}
          >
            {isSidebarExpanded ? (
              <ChevronLeftIcon className="size-4 stroke-foreground" />
            ) : (
              <ChevronRightIcon className="size-4 stroke-foreground" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

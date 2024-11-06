'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SlashIcon } from '@heroicons/react/24/outline';

const Breadcrumb = () => {
  const pathname = usePathname();

  // Get path segments and filter out empty strings
  const pathSegments = pathname.split('/').filter((segment) => segment);
  console.log('🚀 ~ Breadcrumb ~ pathSegments:', pathSegments);

  // Capitalize first letter of each segment for display
  const formatSegment = (segment: string) =>
    segment.charAt(0).toUpperCase() + segment.slice(1);

  return (
    <div className="dark:bg-dark">
      <div className="container">
        <div className="mb-3 w-full">
          <div className="shadow-1 dark:shadow-card bg-tg-bg dark:bg-dark-2 rounded-lg">
            <ul className="flex items-center">
              {/* Dashboard link */}
              {pathSegments.length === 0 && (
                <li className="flex items-center">
                  <Link
                    href="/"
                    className="text-on-secondary hover:text-on-secondary/70 font-bold"
                  >
                    Dashboard
                  </Link>

                  {/* <ChevronRightIcon className="size-5" /> */}
                </li>
              )}

              {/* Dynamic path segments */}
              {pathSegments.map((segment, index) => {
                const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                const isLast = index === pathSegments.length - 1;

                return (
                  <li key={href} className="flex items-center">
                    {!isLast ? (
                      <Link
                        href={href}
                        className="text-on-secondary hover:text-on-secondary/70 font-bold text-xl"
                      >
                        {formatSegment(segment)}
                      </Link>
                    ) : (
                      <span className="text-on-secondary font-bold text-xl">
                        {formatSegment(segment)}
                      </span>
                    )}
                    {!isLast && <SlashIcon className="size-5" />}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;

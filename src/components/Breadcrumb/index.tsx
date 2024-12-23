import { classNames } from '@/components/classNames';
import { Crumb } from '@/types';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

type Props = {
  crumbs: Crumb[];
};

const Breadcrumb = ({ crumbs }: Props) => {
  return (
    <nav>
      <ol className="flex">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={crumb.href} className="flex flex-row">
              {!isLast ? (
                <Link href={crumb.href}>
                  <span
                    className={classNames(
                      'w-72 truncate text-2xl font-bold text-on-primary hover:underline',
                      crumb.className ? crumb.className : ''
                    )}
                  >
                    {crumb.label}
                  </span>
                </Link>
              ) : (
                <span
                  className={classNames(
                    'w-72 truncate text-2xl font-bold text-on-primary',
                    crumb.className ? crumb.className : ''
                  )}
                >
                  {crumb.label}
                </span>
              )}
              {index < crumbs.length - 1 && (
                <ChevronRightIcon className="my-auto inline size-7 text-on-primary" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

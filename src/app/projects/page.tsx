'use client';

import { Breadcrumb } from '@/components';
import React, { ReactNode } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@nextui-org/table';
import { User } from '@nextui-org/user';
import { Tooltip } from '@nextui-org/tooltip';
import { Chip } from '@nextui-org/chip';
import { EyeIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { columns, users } from '@/data/projects.data';
import { userType, statusColorMap } from '@/data/projects.type';
import { useRouter } from 'next/navigation';

const Projects = () => {
  const router = useRouter();

  const renderCell = React.useCallback(
    (user: userType, columnKey: keyof userType | 'actions'): ReactNode => {
      const cellValue = columnKey !== 'actions' ? user[columnKey] : 'actions';

      switch (columnKey) {
        case 'name':
          return (
            <User
              avatarProps={{ radius: 'lg', src: user.avatar }}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          );
        case 'role':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
              <p className="text-bold text-default-400 text-sm capitalize">
                {user.team}
              </p>
            </div>
          );
        case 'status':
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.status as keyof typeof statusColorMap]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case 'actions':
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Details">
                <span
                  className="text-default-400 cursor-pointer text-lg active:opacity-50"
                  onClick={() => router.push(`projects/${user.id}`)}
                >
                  <EyeIcon className="size-5" />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-default-400 cursor-pointer text-lg active:opacity-50">
                  <PencilIcon className="size-5" />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-danger cursor-pointer text-lg active:opacity-50">
                  <TrashIcon className="size-5" />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <main className="flex flex-col items-center p-3 sm:items-start">
      <Breadcrumb />
      <div className="mb-2 h-10 w-full border-b pt-2"></div>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof userType | 'actions')}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
};

export default Projects;

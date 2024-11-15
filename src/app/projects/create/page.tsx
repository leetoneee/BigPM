'use client';

import { Breadcrumb } from '@/components';
import { convertSize, File } from '@/data/files.type';
import { files as filesData } from '@/data/files.data';
import {
  columns,
  ProjectAssignees as teamMembersData
} from '@/data/project-assignment.data';
import { Role } from '@/data/role.type';
import { roles as rolesData } from '@/data/role.data';
import { Position } from '@/data/position.type';
import { positions as positionsData } from '@/data/position.data';
import { ProjectAssignee } from '@/data/project-assignment.type';

import {
  CalendarIcon,
  PlusIcon,
  DocumentTextIcon,
  EyeIcon,
  TrashIcon
} from '@heroicons/react/24/solid';
import {
  Button,
  CalendarDate,
  DateInput,
  Divider,
  Input,
  Pagination,
  Select,
  Selection,
  SelectItem,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  Tooltip,
  useDisclosure
} from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { Key, ReactNode, useCallback, useEffect, useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ProjectAssigneeModal from './project-assignee';

export default function Settings() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();

  const [projectName, setProjectName] = useState<string>('');
  const [startDate, setStartDate] = useState<CalendarDate>();
  const [endDate, setEndDate] = useState<CalendarDate>();
  const [description, setDescription] = useState<string>('');
  const [objecttives, setObjecttives] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);

  const [teamMembers, setTeamMembers] = useState<ProjectAssignee[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);

  const [filterMemberName, setFilterMemberName] = useState<string>('');
  const hasSearchFilterName = Boolean(filterMemberName);

  const [filterRole, setFilterRole] = React.useState<Selection>(
    new Set(['All'])
  );
  const selectedRole = React.useMemo(
    () => Array.from(filterRole).join(', ').replaceAll('_', ' '),
    [filterRole]
  );
  const [filterPosition, setFilterPosition] = React.useState<Selection>(
    new Set(['All'])
  );
  const selectedPosition = React.useMemo(
    () => Array.from(filterPosition).join(', ').replaceAll('_', ' '),
    [filterPosition]
  );

  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const pages = Math.ceil(teamMembers.length / rowsPerPage);

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: '#',
    direction: 'ascending'
  });

  // Load data
  useEffect(() => {
    setFiles(filesData);
    return () => {};
  }, [filesData]);

  useEffect(() => {
    setTeamMembers(teamMembersData);
    return () => {};
  }, [teamMembersData]);

  useEffect(() => {
    const data = [{ id: 0, name: 'All' }, ...rolesData];
    setRoles(data);
    return () => {};
  }, [rolesData]);

  useEffect(() => {
    const data = [{ id: 0, name: 'All' }, ...positionsData];
    setPositions(data);
    return () => {};
  }, [positionsData]);

  const handleDelete = useCallback(
    (memberId: number) => {
      setTeamMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== memberId)
      );
    },
    [setTeamMembers]
  );

  const renderCell = useCallback(
    (member: ProjectAssignee, columnKey: Key): ReactNode => {
      const cellValue =
        columnKey !== 'actions'
          ? member[columnKey as keyof ProjectAssignee]
          : 'actions';

      switch (columnKey) {
        case 'id':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case 'staffName':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case 'role':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case 'position':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case 'email':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case 'actions':
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Details" color="primary">
                <span
                  className="cursor-pointer text-lg text-primary active:opacity-50"
                  onClick={() => router.push(`projects/${member.id}`)}
                >
                  <EyeIcon className="size-5" />
                </span>
              </Tooltip>
              {/* <Tooltip content="Edit user" color="warning">
                <span className="cursor-pointer text-lg text-warning active:opacity-50">
                  <PencilIcon className="size-5" />
                </span>
              </Tooltip> */}
              <Tooltip color="danger" content="Delete member from project">
                <span
                  className="cursor-pointer text-lg text-danger active:opacity-50"
                  onClick={() => handleDelete(member.id)}
                >
                  <TrashIcon className="size-5" />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [teamMembers]
  );

  const filteredItems = React.useMemo(() => {
    let filteredMembers = [...teamMembers];
    setPage(1);

    if (hasSearchFilterName) {
      filteredMembers = filteredMembers.filter((member) =>
        member.staffName.toLowerCase().includes(filterMemberName.toLowerCase())
      );
    }
    if (selectedPosition !== 'All') {
      filteredMembers = filteredMembers.filter(
        (member) => member.position === selectedPosition
      );
    }
    if (selectedRole !== 'All') {
      filteredMembers = filteredMembers.filter(
        (member) => member.role === selectedRole
      );
    }
    return filteredMembers;
  }, [teamMembers, filterMemberName, selectedPosition, selectedRole]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: ProjectAssignee, b: ProjectAssignee) => {
      const first = a[sortDescriptor.column as keyof ProjectAssignee] as number;
      const second = b[
        sortDescriptor.column as keyof ProjectAssignee
      ] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const topContent: ReactNode = React.useMemo(() => {
    return (
      // Search/Filter
      <div className="flex w-full flex-row gap-16">
        {/* Search Name*/}
        <div className="flex flex-col gap-2">
          <span>Project name</span>
          <Input
            className="w-full bg-white"
            variant="bordered"
            size={'md'}
            type=""
            placeholder="Find your team member"
            value={filterMemberName}
            onChange={(e) => setFilterMemberName(e.target.value)}
          />
        </div>
        {/* Position Filter*/}
        <div className="flex flex-col gap-2">
          <span>Position</span>
          <Select
            variant="bordered"
            // placeholder="Select an animal"
            selectedKeys={filterPosition}
            className="w-56"
            onSelectionChange={setFilterPosition}
          >
            {/* <SelectItem key={'All'}>All</SelectItem> */}
            {positions.map((position) => (
              <SelectItem key={position.name}>{position.name}</SelectItem>
            ))}
          </Select>
        </div>
        {/* Role Filter*/}
        <div className="flex flex-col gap-2">
          <span>Role</span>
          <Select
            variant="bordered"
            // placeholder="Select an animal"
            selectedKeys={filterRole}
            className="w-32"
            onSelectionChange={setFilterRole}
          >
            {/* <SelectItem key={'All'}>All</SelectItem> */}
            {roles.map((role) => (
              <SelectItem key={role.name}>{role.name}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="h-full place-content-end">
          <Button
            className="mb-auto h-14 rounded-2xl bg-main-blue text-white shadow-md"
            startContent={<MagnifyingGlassIcon className="size-6 text-white" />}
            size="sm"
          />
        </div>
        <Button
          className="my-auto ml-auto h-14 rounded-2xl bg-main-blue text-white shadow-md"
          startContent={<PlusIcon className="size-6 text-white" />}
          size="lg"
          onClick={onOpen}
        >
          Add
        </Button>
      </div>
    );
  }, [filterMemberName, filterPosition, positions, filterRole, roles]);

  return (
    <main className="flex h-full flex-col items-center p-3 sm:items-start">
      <Breadcrumb />
      <div className="mb-3 h-2 w-full border-b pt-2"></div>
      <div className="flex min-h-max w-full flex-col gap-4 rounded-xl bg-[#FFFFFF] p-6">
        {/* Project Name | Start Date | End Date */}
        <div className="flex w-full flex-row gap-28">
          {/* Project Name */}
          <div className="flex w-full shrink flex-col gap-2">
            <span className="text-2xl font-semibold text-on-primary">
              Project Name
            </span>
            <Input
              type="text"
              variant="bordered"
              className="w-full"
              size="lg"
              placeholder="Enter your project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          {/* Start Date */}
          <div className="ml-auto flex flex-col gap-2">
            <span className="text-2xl font-semibold text-on-primary">
              Start Date
            </span>
            <DateInput
              key={'start-date'}
              className="w-[210px] text-base"
              size="lg"
              endContent={<CalendarIcon className="size-10 text-primary" />}
              value={startDate}
              onChange={setStartDate}
            />
          </div>
          {/* End Date */}
          <div className="ml-auto flex flex-col gap-2">
            <span className="text-2xl font-semibold text-on-primary">
              End Date
            </span>
            <DateInput
              key={'end-date'}
              size="lg"
              endContent={<CalendarIcon className="size-10 text-primary" />}
              className="h-14 w-[210px] text-base"
              value={endDate}
              onChange={setEndDate}
            />
          </div>
        </div>
        {/* Description | Objectives */}
        <div className="flex w-full flex-row gap-28">
          {/* Description */}
          <div className="flex w-full flex-col gap-2">
            <span className="text-2xl font-semibold text-on-primary">
              Description
            </span>
            <Textarea
              variant={'bordered'}
              size="lg"
              placeholder="Enter your description"
              className="col-span-12 mb-6 md:col-span-6 md:mb-0"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* Objectives */}
          <div className="flex w-full flex-col gap-2">
            <span className="text-2xl font-semibold text-on-primary">
              Objectives
            </span>
            <Textarea
              variant={'bordered'}
              size="lg"
              placeholder="Enter your objectives"
              className="col-span-12 mb-6 md:col-span-6 md:mb-0"
              value={objecttives}
              onChange={(e) => setObjecttives(e.target.value)}
            />
          </div>
        </div>
        {/* Attached Files */}
        <div className="flex w-full flex-col">
          <div className="flex flex-row items-center gap-4">
            <span className="text-2xl font-semibold text-on-primary">
              Attached Files
            </span>
            <button className="rounded-[10px] bg-main-blue p-1 text-white">
              <PlusIcon className="size-7 text-white shadow-md" />
            </button>
          </div>
          <Divider className="my-4" />
          <div className="flex flex-col gap-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex flex-row items-center justify-between pr-5 hover:bg-on-container-focus/20"
              >
                <div className="flex flex-row items-center gap-4">
                  <DocumentTextIcon className="size-8" />
                  <span className="text-base font-semibold">
                    {file.fileName}.{file.ext}
                  </span>
                  <span className="text-base font-light">
                    {convertSize(file.fileSize)}
                  </span>
                </div>
                <div className="relative flex items-center justify-center gap-4">
                  <Tooltip content="Details" color="primary">
                    <span className="cursor-pointer text-lg text-primary active:opacity-50">
                      <EyeIcon className="size-5" />
                    </span>
                  </Tooltip>

                  <Tooltip color="danger" content="Delete file">
                    <span className="cursor-pointer text-lg text-danger active:opacity-50">
                      <TrashIcon className="size-5" />
                    </span>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
          <Divider className="my-4" />
        </div>
        {/* Team Members */}
        <div className="flex w-full flex-col">
          {/* Title */}
          <span className="text-2xl font-semibold text-on-primary">
            Team Members
          </span>
          {/* Table Content*/}
          <div className="flex h-[430px] flex-col gap-2">
            {/* Table */}
            <div className="h-full shrink overflow-hidden rounded-xl shadow-xl">
              <Table
                aria-label="Example table with client side pagination"
                className="h-full w-full"
                selectionMode="single"
                // color="#F7F9FD"
                shadow="none"
                topContent={topContent}
                topContentPlacement="inside"
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
              >
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn
                      key={column.uid}
                      align={column.uid === 'actions' ? 'center' : 'start'}
                      allowsSorting={column.sortable}
                    >
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody
                  className="bg-second-blue"
                  items={sortedItems}
                  emptyContent={'No rows to display.'}
                >
                  {(item) => (
                    <TableRow key={item.id}>
                      {(columnKey) => (
                        <TableCell>{renderCell(item, columnKey)}</TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {/* Pagination */}
            <div className="mb-auto flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                className="text-main-blue"
                // color="#00AAFF"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          </div>
        </div>
        {/* Save Button */}
        <div className="flex w-full">
          <Button
            className="ml-auto h-14 rounded-2xl bg-main-blue text-white"
            startContent={
              <Image
                src={'/icons/save.svg'}
                alt="save"
                className="size-6 text-white"
                width={24}
                height={24}
              />
            }
            size="lg"
          >
            Save
          </Button>
        </div>
      </div>

      <ProjectAssigneeModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        teamMembers={teamMembers}
        setTeamMembers={setTeamMembers}
      />
    </main>
  );
}

'use client';

import { Breadcrumb } from '@/components';
import React, {
  Key,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  SortDescriptor
} from '@nextui-org/table';
import { Tooltip } from '@nextui-org/tooltip';
import { Chip } from '@nextui-org/chip';
import {
  EyeIcon,
  TrashIcon,
  PencilIcon,
  ChevronDownIcon,
  PlusIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { columns, projects as data, statusOptions } from '@/data/projects.data';
import { statusColorMap, Project } from '@/data/projects.type';
import { useRouter } from 'next/navigation';
import {
  Button,
  CalendarDate,
  DateInput,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection
} from '@nextui-org/react';
import { DatePicker } from '@nextui-org/date-picker';
import { Crumb } from '@/types';

const Projects = () => {
  const router = useRouter();
  const crumbs: Crumb[] = [
    {
      label: 'Projects',
      href: '/projects'
    }
  ];

  const [projects, setProjects] = useState<Project[]>([]);
  const [notStartedProjects, setNotStartedProjects] = useState<number>(0);
  const [inProgressProjects, setInProgressProjects] = useState<number>(0);
  const [completedProjects, setCompletedProjects] = useState<number>(0);
  const [onHoldProjects, setOnHoldProjects] = useState<number>(0);
  const [totalProjects, setTotalProjects] = useState<number>(0);

  const [filterProjectName, setFilterProjectName] = useState<string>('');
  const hasSearchFilter = Boolean(filterProjectName);
  const [selectedStatus, setSelectedStatus] = useState<Selection>(
    new Set(['All'])
  );
  const selectedValue = React.useMemo(
    () => Array.from(selectedStatus).join(', ').replaceAll('_', ' '),
    [selectedStatus]
  );

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: '#',
    direction: 'ascending'
  });

  const [filterStartDate, setFilterStartDate] = useState<CalendarDate>();
  const [filterEndDate, setFilterEndDate] = useState<CalendarDate>();

  useEffect(() => {
    setProjects(data);

    return () => {};
  }, [data]);

  useEffect(() => {
    setCompletedProjects(
      projects.filter((project) => project.status === 'Completed').length
    );
    setInProgressProjects(
      projects.filter((project) => project.status === 'In Progress').length
    );
    setOnHoldProjects(
      projects.filter((project) => project.status === 'On Hold').length
    );
    setNotStartedProjects(
      projects.filter((project) => project.status === 'Not Started').length
    );
    setTotalProjects(projects.length);
    return () => {};
  }, [projects]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(projects.length / rowsPerPage);

  const renderCell = useCallback(
    (project: Project, columnKey: Key): ReactNode => {
      const cellValue =
        columnKey !== 'actions'
          ? project[columnKey as keyof Project]
          : 'actions';

      switch (columnKey) {
        case 'id':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case 'name':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case 'status':
          return (
            <Chip
              className="capitalize"
              color={
                statusColorMap[project.status as keyof typeof statusColorMap]
              }
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case 'progress':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}%</p>
            </div>
          );
        case 'startDate':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {new Date(cellValue).toLocaleDateString('vi-VE', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </p>
            </div>
          );
        case 'endDate':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {new Date(cellValue).toLocaleDateString('vi-VE', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </p>
            </div>
          );
        case 'actions':
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Details" color="primary">
                <span
                  className="cursor-pointer text-lg text-primary active:opacity-50"
                  onClick={() => router.push(`projects/${project.id}`)}
                >
                  <EyeIcon className="size-5" />
                </span>
              </Tooltip>
              {/* <Tooltip content="Edit user" color="warning">
                <span className="cursor-pointer text-lg text-warning active:opacity-50">
                  <PencilIcon className="size-5" />
                </span>
              </Tooltip> */}
              <Tooltip color="danger" content="Delete user">
                <span className="cursor-pointer text-lg text-danger active:opacity-50">
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

  const renderChip = useCallback((content: string): ReactNode => {
    switch (content) {
      case 'Completed':
        return (
          <Chip
            className="capitalize"
            color={'success'}
            size="sm"
            variant="flat"
          >
            {content}
          </Chip>
        );
      case 'In Progress':
        return (
          <Chip
            className="capitalize"
            color={'warning'}
            size="sm"
            variant="flat"
          >
            {content}
          </Chip>
        );
      case 'On Hold':
        return (
          <Chip
            className="capitalize"
            color={'danger'}
            size="sm"
            variant="flat"
          >
            {content}
          </Chip>
        );
      case 'Not Started':
        return (
          <Chip
            className="capitalize"
            color={'default'}
            size="sm"
            variant="flat"
          >
            {content}
          </Chip>
        );
    }
  }, []);

  const filteredItems = React.useMemo(() => {
    let filteredProjects = [...projects];
    setPage(1);

    if (hasSearchFilter) {
      filteredProjects = filteredProjects.filter((project) =>
        project.name.toLowerCase().includes(filterProjectName.toLowerCase())
      );
    }

    if (
      selectedValue !== 'All' &&
      Array.from(selectedStatus).length !== statusOptions.length
    ) {
      filteredProjects = filteredProjects.filter((project) =>
        Array.from(selectedStatus).includes(project.status)
      );
    }
    if (filterStartDate) {
      const startDate = new Date(
        filterStartDate.year,
        filterStartDate.month,
        filterStartDate.day
      );
      filteredProjects = filteredProjects.filter(
        (project) => new Date(project.startDate) >= startDate
      );
    }
    if (filterEndDate) {
      const endDate = new Date(
        filterEndDate.year,
        filterEndDate.month,
        filterEndDate.day
      );
      filteredProjects = filteredProjects.filter(
        (project) => new Date(project.endDate) <= endDate
      );
    }

    return filteredProjects;
  }, [
    projects,
    filterProjectName,
    filterStartDate,
    filterEndDate,
    selectedValue,
    selectedStatus
  ]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Project, b: Project) => {
      const first = a[sortDescriptor.column as keyof Project] as number;
      const second = b[sortDescriptor.column as keyof Project] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  return (
    <main className="flex h-full flex-col items-center p-3 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <div className="mb-3 h-2 w-full border-b pt-2"></div>
      <div className="flex h-full w-full flex-col gap-6 rounded-xl bg-[#FFFFFF] p-6">
        {/* Thống kê và search */}
        <div className="flex w-full flex-col gap-5 rounded-xl bg-[#F7F9FD] p-8 shadow-xl">
          {/* Thống kê */}
          <div className="flex w-full flex-row gap-16">
            <Chip
              className="rounded-sm capitalize"
              color={'danger'}
              size="lg"
              variant="flat"
            >
              On Hold: {onHoldProjects}
            </Chip>
            <Chip
              className="rounded-sm capitalize"
              color={'warning'}
              size="lg"
              variant="flat"
            >
              In Progress: {inProgressProjects}
            </Chip>
            <Chip
              className="rounded-sm capitalize"
              color={'success'}
              size="lg"
              variant="flat"
            >
              Completed: {completedProjects}
            </Chip>
            <Chip
              className="rounded-sm capitalize"
              color={'default'}
              size="lg"
              variant="flat"
            >
              Not Started: {notStartedProjects}
            </Chip>
            <span>
              Total: <span className="text-2xl">{totalProjects}</span> projects
            </span>
          </div>
          {/* Search/Filter */}
          <div className="flex w-full flex-row gap-16">
            {/* Search Name*/}
            <div className="flex flex-col gap-2">
              <span>Project name</span>
              <Input
                className="bg-white"
                variant="bordered"
                size={'md'}
                type=""
                placeholder="Find your project name"
                value={filterProjectName}
                onChange={(e) => setFilterProjectName(e.target.value)}
              />
            </div>
            {/* Filter Status */}
            <div className="flex flex-col gap-2">
              <span>Status</span>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="w-36 capitalize">
                    {selectedValue === 'All'
                      ? 'All'
                      : renderChip(selectedValue)}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Single selection example"
                  variant="flat"
                  selectionMode="single"
                  selectedKeys={selectedStatus}
                  onSelectionChange={setSelectedStatus}
                >
                  <DropdownItem key="All">All</DropdownItem>
                  <DropdownItem key="Completed">
                    {renderChip('Completed')}
                  </DropdownItem>
                  <DropdownItem key="In Progress">
                    {renderChip('In Progress')}
                  </DropdownItem>
                  <DropdownItem key="On Hold">
                    {renderChip('On Hold')}
                  </DropdownItem>
                  <DropdownItem key="Not Started">
                    {renderChip('Not Started')}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            {/* Filter Start date */}
            <div className="flex flex-col gap-2">
              <span>Start date</span>
              <DateInput
                key={'start-date'}
                variant="bordered"
                className="w-[210px]"
                value={filterStartDate}
                onChange={setFilterStartDate}
              />
            </div>
            {/* Filter end date */}
            <div className="flex flex-col gap-2">
              <span>End date</span>
              <DateInput
                key={'end-date'}
                variant="bordered"
                className="w-[210px]"
                value={filterEndDate}
                onChange={setFilterEndDate}
              />
            </div>
            <div className="h-full place-content-center">
              <Button
                className="h-14 rounded-2xl bg-main-blue text-white shadow-md"
                startContent={
                  <MagnifyingGlassIcon className="size-6 text-white" />
                }
                size="sm"
              />
            </div>
            <Button
              className="my-auto ml-auto h-14 rounded-2xl bg-main-blue text-white shadow-md"
              startContent={<PlusIcon className="size-6 text-white" />}
              size="lg"
              onClick={() => router.push('/projects/create')}
            >
              Create
            </Button>
          </div>
        </div>
        {/* Table */}
        <div className="h-[482px] shrink overflow-hidden rounded-xl shadow-xl">
          <Table
            aria-label="Example table with client side pagination"
            className="h-full w-full"
            selectionMode="single"
            // color="#F7F9FD"
            shadow="none"
            // bottomContent={
            //   <div className="mb-auto flex w-full justify-center">
            //     <Pagination
            //       isCompact
            //       showControls
            //       showShadow
            //       color="#00AAFF"
            //       page={page}
            //       total={pages}
            //       onChange={(page) => setPage(page)}
            //     />
            //   </div>
            // }
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
            <TableBody items={sortedItems} emptyContent={'No rows to display.'}>
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
        {/* Pagiantion */}
        <div className="mb-auto flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </main>
  );
};

export default Projects;

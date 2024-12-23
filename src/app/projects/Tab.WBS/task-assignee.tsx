'use client';

import {
  columns,
  staffList as staffData
} from '@/data/project-assignment-2.data';
import { Role } from '@/data/role.type';
import { roles as rolesData } from '@/data/role.data';
import { Position } from '@/data/position.type';
import { positions as positionsData } from '@/data/position.data';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  useDisclosure,
  Selection,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  SortDescriptor,
  Input,
  Select,
  SelectItem,
  Pagination,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableColumn,
  Tooltip
} from '@nextui-org/react';
import React, {
  Dispatch,
  Key,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { Assignee } from '@/data/project-assignment-2.type';
// import { ProjectAssignee } from '@/data/project-assignment.type';
import { ChipAvatar } from './ViewTaskModal.view';
type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  teamMembers: ChipAvatar[];
  setTeamMembers: Dispatch<SetStateAction<ChipAvatar[]>>;
};

const maxInProgressProject: number = 4;

const TaskAssigneeModal = ({
  isOpen,
  onOpen,
  onOpenChange,
  teamMembers,
  setTeamMembers
}: Props) => {
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

  const [filterInProgressProject, setFilterInProgressProject] =
    useState<string>('');
  const hasSearchFilterProject = Boolean(filterInProgressProject);

  // defaultKeys and disabledKey for Table in Modal
  const [assignees, setAssignees] = useState<Assignee[]>([]);

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [lastSelectedKeys, setLastSelectedKeys] = useState<Selection>(
    new Set([])
  );
  const [disabledKeys, setDisabledKeys] = useState<Selection>(new Set([]));

  useEffect(() => {
    const disabledIds = new Set(
      assignees
        .filter(
          (assignee) => assignee.inProgressProjects >= maxInProgressProject
        )
        .map((assignee) => assignee.id.toString())
    );
    setDisabledKeys(disabledIds);
  }, [assignees, maxInProgressProject]);

  useEffect(() => {
    // Find matching assignee IDs
    const selectedIds = new Set(
      assignees
        .filter((assignee) =>
          teamMembers.some((member) => member.id === assignee.id)
        )
        .map((assignee) => assignee.id.toString())
    );
    setSelectedKeys(selectedIds);
    setLastSelectedKeys(selectedIds);
  }, [assignees, teamMembers]);
  //

  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const pages = Math.ceil(assignees.length / rowsPerPage);

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: '#',
    direction: 'ascending'
  });

  // Load data
  useEffect(() => {
    setAssignees(staffData);
  }, [staffData]);

  useEffect(() => {
    const data = [{ id: 0, name: 'All' }, ...rolesData];
    setRoles(data);
  }, [rolesData]);

  useEffect(() => {
    const data = [{ id: 0, name: 'All' }, ...positionsData];
    setPositions(data);
  }, [positionsData]);

  const renderCell = useCallback(
    (member: Assignee, columnKey: Key): ReactNode => {
      const cellValue =
        columnKey !== 'actions'
          ? member[columnKey as keyof Assignee]
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
        case 'inProgressProjects':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const filteredItems = React.useMemo(() => {
    let filteredMembers = [...assignees];
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
    if (hasSearchFilterProject) {
      filteredMembers = filteredMembers.filter(
        (member) =>
          member.inProgressProjects === Number(filterInProgressProject)
      );
    }
    return filteredMembers;
  }, [
    assignees,
    filterMemberName,
    selectedPosition,
    selectedRole,
    filterInProgressProject
  ]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Assignee, b: Assignee) => {
      const first = a[sortDescriptor.column as keyof Assignee] as number;
      const second = b[sortDescriptor.column as keyof Assignee] as number;
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
        {/* In progress number */}
        <div className="flex flex-col gap-2">
          <span>In progress project</span>
          <Input
            className="w-full bg-white"
            variant="bordered"
            size={'md'}
            type="number"
            placeholder="Find by projects"
            value={filterInProgressProject}
            onChange={(e) => setFilterInProgressProject(e.target.value)}
          />
        </div>
        {/* <div className="h-full place-content-end">
          <Button
            className="mb-auto h-14 rounded-2xl bg-main-blue text-white shadow-md"
            startContent={<MagnifyingGlassIcon className="size-6 text-white" />}
            size="sm"
          />
        </div> */}
      </div>
    );
  }, [
    filterMemberName,
    filterPosition,
    positions,
    filterRole,
    roles,
    filterInProgressProject
  ]);

  const handleContinue = () => {
    const selectedAssignees: ChipAvatar[] = assignees
      .filter((assignee) => {
        if (selectedKeys === 'all') return true;
        if (selectedKeys instanceof Set) {
          return selectedKeys.has(assignee.id.toString());
        }
      })
      .map((assignee) => ({
        id: assignee.id,
        assigneeName: assignee.staffName,
        asigneeAvatar: assignee.avatar
      }));
    console.log('🚀 ~ handleContinue ~ selectedAssignees:', selectedAssignees);

    setTeamMembers(selectedAssignees);
  };

  const handleClose = () => {
    setSelectedKeys(lastSelectedKeys);
    setPage(1);
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="sm"
      size="5xl"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton
      classNames={{
        body: 'py-6 bg-white border-outline-var',
        backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
        base: 'border-outline-var bg-outline-var text-on-primary',
        header: 'border-b-[1px] border-border bg-white',
        footer: 'border-t-[1px] border-border bg-white'
        // closeButton: 'hover:bg-on-primary/5 active:bg-on-primary/10 disable'
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-row justify-between">
              <span className="text-4xl font-semibold">
                Add Staff To Project
              </span>
              <XMarkIcon
                className="size-10 hover:cursor-pointer"
                onClick={onClose}
              />
            </ModalHeader>
            <ModalBody>
              <div className="flex h-[440px] flex-col gap-2">
                {/* Table */}
                <div className="h-full shrink overflow-hidden rounded-xl border border-outline-var/75 shadow-xl">
                  <Table
                    aria-label="Example table with client side pagination"
                    className="h-full w-full"
                    selectionMode="multiple"
                    shadow="none"
                    topContent={topContent}
                    topContentPlacement="inside"
                    sortDescriptor={sortDescriptor}
                    onSortChange={setSortDescriptor}
                    disabledKeys={disabledKeys}
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
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
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-main-blue p-5 text-xl text-white shadow-lg"
                onPress={() => {
                  handleContinue();
                  onClose();
                }}
              >
                Continue
              </Button>
              <Button
                color="default"
                variant="solid"
                onPress={() => {
                  handleClose();
                  onClose();
                }}
                className="ml-6 p-5 text-xl shadow-lg"
              >
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TaskAssigneeModal;

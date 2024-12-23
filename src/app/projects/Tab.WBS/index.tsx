import { getTaskGroupsByProjectId } from '@/data/task-group.data';
import { ReorderItemType, TasksInGroup } from '@/data/task-group.type';
import {
  Button,
  CalendarDate,
  Chip,
  DateInput,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Selection,
  useDisclosure
} from '@nextui-org/react';
import { Reorder } from 'framer-motion';
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import RenderGroupTasks from './RenderGroupTasks';
import { isTasksInGroup } from '@/helpers/isTasksInGroup';
import RenderTask from './RenderTask';
import { Task } from '@/data/tasks.type';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { AppContext } from '@/contexts';
import AddCategoryModal from './Modal.Category/AddCategory.modal';
import { toast } from 'react-toastify';
import AddTaskModal from './Modal.Task/AddTaskModal.modal';

type Props = {
  id: number;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type GroupTasksType = {
  groupTasks: TasksInGroup[];
  setGroupTasks: React.Dispatch<React.SetStateAction<TasksInGroup[]>>;
};

const WBS = ({ id, setIsModalNewTaskOpen }: Props) => {
  const { groupTasks, setGroupTasks } = useContext(
    AppContext
  ) as GroupTasksType;
  //! CONTROL Add Category modal
  const {
    isOpen: isOpenC,
    onOpen: onOpenC,
    onOpenChange: onOpenChangeC,
    onClose: onCloseC
  } = useDisclosure();
  //! CONTROL Add Task modal
  const {
    isOpen: isOpenT,
    onOpen: onOpenT,
    onOpenChange: onOpenChangeT,
    onClose: onCloseT
  } = useDisclosure();

  const [notStartedTasks, setNotStartedTasks] = useState<number>(0);
  const [inProgressTasks, setInProgressTasks] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [onHoldTasks, setOnHoldTasks] = useState<number>(0);
  const [totalTasks, setTotalTasks] = useState<number>(0);

  const groupRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const [selectedStatus, setSelectedStatus] = useState<Selection>(
    new Set(['all'])
  );
  const selectedValue = React.useMemo(
    () => Array.from(selectedStatus).join(', ').replaceAll('_', ' '),
    [selectedStatus]
  );

  const [filterStartDate, setFilterStartDate] = useState<CalendarDate>();
  const [filterEndDate, setFilterEndDate] = useState<CalendarDate>();

  // Load data
  useEffect(() => {
    const data = getTaskGroupsByProjectId(id);
    console.log('🚀 ~ useEffect ~ data:', data);
    setGroupTasks(data);
  }, [id]);

  useEffect(() => {
    const countNotStartedTasks = groupTasks.reduce((total, group) => {
      const numOfTasks = group.tasks.filter(
        (task) => task.status === 'Not Started'
      ).length;
      return total + numOfTasks;
    }, 0);
    const countCompletedTasks = groupTasks.reduce((total, group) => {
      const numOfTasks = group.tasks.filter(
        (task) => task.status === 'Completed'
      ).length;
      return total + numOfTasks;
    }, 0);
    const countOnHoldTasks = groupTasks.reduce((total, group) => {
      const numOfTasks = group.tasks.filter(
        (task) => task.status === 'On Hold'
      ).length;
      return total + numOfTasks;
    }, 0);
    const countInProgressTasks = groupTasks.reduce((total, group) => {
      const numOfTasks = group.tasks.filter(
        (task) => task.status === 'In Progress'
      ).length;
      return total + numOfTasks;
    }, 0);
    const countTotalTasks = groupTasks.reduce((total, group) => {
      const numOfTasks = group.tasks.length;
      return total + numOfTasks;
    }, 0);

    setCompletedTasks(countCompletedTasks);
    setInProgressTasks(countInProgressTasks);
    setOnHoldTasks(countOnHoldTasks);
    setNotStartedTasks(countNotStartedTasks);
    setTotalTasks(countTotalTasks);
  }, [groupTasks]);

  const handleTaskMove = (task: Task, targetGroupId: number) => {
    setGroupTasks((prevGroups) => {
      // Remove task from its current group
      const newGroups = prevGroups.map((group) => ({
        ...group,
        tasks: group.tasks.filter((t) => t.id !== task.id)
      }));

      // Find the target group and add the task to it
      return newGroups.map((group) =>
        group.id === targetGroupId
          ? {
              ...group,
              tasks: [...group.tasks, { ...task, taskGroupId: targetGroupId }]
            }
          : group
      );
    });
  };

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

  const handleCreated = () => {
    toast.success('Task has been deleted successfully');
  };

  return (
    <main className="flex h-full flex-col items-center p-3 sm:items-start">
      <div className="flex w-full flex-col gap-5">
        {/* Time/Progress */}
        <div className="flex w-full flex-row gap-5">
          {/* Thống kê */}
          <div className="flex w-full basis-[60%] flex-col gap-2 rounded-xl bg-[#F7F9FD] p-5 shadow-xl">
            <span className="text-2xl font-semibold text-on-primary">Time</span>
            <div className="flex w-full flex-row gap-10">
              <Chip
                className="rounded-sm capitalize"
                color={'danger'}
                size="lg"
                variant="flat"
              >
                Time spent: {onHoldTasks}
              </Chip>
              <Chip
                className="rounded-sm capitalize"
                color={'warning'}
                size="lg"
                variant="flat"
              >
                Time Remaining: {inProgressTasks}
              </Chip>
              <span>
                Total: <span className="text-2xl">{totalTasks}</span> days
              </span>
            </div>
          </div>
          {/* Thống kê */}
          <div className="flex w-full basis-[40%] flex-col gap-2 rounded-xl bg-[#F7F9FD] p-5 shadow-xl">
            <span className="text-2xl font-semibold text-on-primary">
              Progress
            </span>
            <div className="flex w-full flex-row gap-10">
              <Chip
                className="rounded-sm capitalize"
                color={'danger'}
                size="lg"
                variant="flat"
              >
                Planned: {onHoldTasks}%
              </Chip>
              <Chip
                className="rounded-sm capitalize"
                color={'warning'}
                size="lg"
                variant="flat"
              >
                Actual: {inProgressTasks}%
              </Chip>
            </div>
          </div>
        </div>
        {/* Tasks */}
        <div className="flex w-full flex-col gap-2 rounded-xl bg-white p-5 shadow-xl">
          <span className="text-2xl font-semibold text-on-primary">Tasks</span>
          <div className="flex w-full flex-row gap-10">
            <Chip
              className="rounded-sm capitalize"
              color={'danger'}
              size="lg"
              variant="flat"
            >
              On Hold: {onHoldTasks}
            </Chip>
            <Chip
              className="rounded-sm capitalize"
              color={'warning'}
              size="lg"
              variant="flat"
            >
              In Progress: {inProgressTasks}
            </Chip>
            <Chip
              className="rounded-sm capitalize"
              color={'success'}
              size="lg"
              variant="flat"
            >
              Completed: {completedTasks}
            </Chip>
            <Chip
              className="rounded-sm capitalize"
              color={'default'}
              size="lg"
              variant="flat"
            >
              Not Started: {notStartedTasks}
            </Chip>
            <span>
              Total: <span className="text-2xl">{totalTasks}</span> tasks
            </span>
          </div>
        </div>
        {/* Assign Tasks */}
        <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-5 shadow-xl">
          {/* Search/Filter */}
          <div className="flex w-full flex-row gap-10 rounded-xl bg-[#F4F7FC]/75 px-8 py-4">
            {/* Filter Status */}
            <div className="flex flex-col gap-2">
              <span>Status</span>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="w-36 capitalize">
                    {selectedValue === 'all'
                      ? 'all'
                      : renderChip(selectedValue)}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Single selection example"
                  variant="flat"
                  selectionMode="single"
                  selectedKeys={selectedStatus}
                  disallowEmptySelection
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
            <Button
              className="my-auto h-14 rounded-2xl bg-main-blue text-white shadow-md"
              startContent={
                <MagnifyingGlassIcon className="size-6 text-white" />
              }
              size="sm"
            />
            <button
              className="my-auto ml-auto flex h-14 flex-row items-center justify-center rounded-2xl bg-main-blue px-2 text-white shadow-md"
              onClick={onOpenC}
            >
              <PlusIcon className="size-6 text-white" /> Add Category
            </button>
            <button
              className="my-auto ml-auto flex h-14 flex-row items-center justify-center rounded-2xl bg-main-blue px-2 text-white shadow-md"
              onClick={onOpenT}
            >
              <PlusIcon className="size-6 text-white" /> Add Task
            </button>
          </div>
          <div className="flex w-full flex-col gap-2 rounded-xl bg-[#F4F7FC]/75">
            {/* Header Row */}
            <div className="flex w-full rounded-tl-xl rounded-tr-xl">
              <div className="basis-[40%] items-center truncate text-ellipsis whitespace-nowrap px-14 py-4 text-left font-bold">
                CATEGORY/TASK NAME
              </div>
              <div className="basis-[12%] items-center py-4 text-center font-bold">
                STATUS
              </div>
              <div className="basis-[12%] items-center py-4 text-center font-bold">
                PROGRESS
              </div>
              <div className="basis-[12%] items-center py-4 text-center font-bold">
                START DATE
              </div>
              <div className="basis-[12%] items-center py-4 text-center font-bold">
                END DATE
              </div>
              <div className="basis-[12%] items-center py-4 text-center font-bold">
                ASSIGNEE
              </div>
            </div>
            <Reorder.Group values={groupTasks} onReorder={setGroupTasks}>
              {groupTasks.map((groupTask) => (
                <Reorder.Item key={groupTask.id} value={groupTask}>
                  <RenderGroupTasks
                    key={`${groupTask.id}-${groupTask.tasks.length}`}
                    data={groupTask}
                    groupRefs={groupRefs}
                    onTaskMove={handleTaskMove}
                    groups={groupTasks}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </div>
      </div>
      <AddCategoryModal
        isOpen={isOpenC}
        onOpenChange={onOpenChangeC}
        onClose={onCloseC}
        onOpen={onOpenC}
        onCreated={handleCreated}
      />
      <AddTaskModal
        isOpen={isOpenT}
        onOpenChange={onOpenChangeT}
        onClose={onCloseT}
        onOpen={onOpenT}
        onCreated={handleCreated}
      />
    </main>
  );
};

export default WBS;

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
  Selection
} from '@nextui-org/react';
import { Reorder } from 'framer-motion';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import RenderGroupTasks from './RenderGroupTasks';
import { isTasksInGroup } from '@/helpers/isTasksInGroup';
import RenderTask from './RenderTask';
import { Task } from '@/data/tasks.type';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

type Props = {
  id: number;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const WBS = ({ id, setIsModalNewTaskOpen }: Props) => {
  const [groupTasks, setGroupTasks] = useState<TasksInGroup[]>([]);
  const [notStartedProjects, setNotStartedProjects] = useState<number>(0);
  const [inProgressProjects, setInProgressProjects] = useState<number>(0);
  const [completedProjects, setCompletedProjects] = useState<number>(0);
  const [onHoldProjects, setOnHoldProjects] = useState<number>(0);
  const [totalProjects, setTotalProjects] = useState<number>(0);

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

  useEffect(() => {
    const data = getTaskGroupsByProjectId(id);
    console.log('🚀 ~ useEffect ~ data:', data);
    setGroupTasks(data);
  }, [id]);

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

  return (
    <main className="flex h-full flex-col items-center p-3 sm:items-start">
      <div className="flex w-full flex-col gap-5">
        {/* Time/Progress */}
        <div className="flex w-full flex-row gap-5">
          {/* Thống kê */}
          <div className="flex w-full flex-col gap-2 rounded-xl bg-[#F7F9FD] p-5 shadow-xl">
            <span className="text-2xl font-semibold text-on-primary">Time</span>
            <div className="flex w-full flex-row gap-10">
              <Chip
                className="rounded-sm capitalize"
                color={'danger'}
                size="lg"
                variant="flat"
              >
                Time spent: {onHoldProjects}
              </Chip>
              <Chip
                className="rounded-sm capitalize"
                color={'warning'}
                size="lg"
                variant="flat"
              >
                Time Remaining: {inProgressProjects}
              </Chip>
              <span>
                Total: <span className="text-2xl">{totalProjects}</span> days
              </span>
            </div>
          </div>
          {/* Thống kê */}
          <div className="flex w-full flex-col gap-2 rounded-xl bg-[#F7F9FD] p-5 shadow-xl">
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
                Planned: {onHoldProjects}%
              </Chip>
              <Chip
                className="rounded-sm capitalize"
                color={'warning'}
                size="lg"
                variant="flat"
              >
                Actual: {inProgressProjects}%
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
              Total: <span className="text-2xl">{totalProjects}</span> tasks
            </span>
          </div>
        </div>
        {/* Assign Tasks */}
        <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-5 shadow-xl">
          {/* Search/Filter */}
          <div className="flex w-full flex-row gap-16 rounded-xl bg-[#F4F7FC]/75 px-8 py-4">
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
            <Button
              className="my-auto ml-auto h-14 rounded-2xl bg-main-blue text-white shadow-md"
              startContent={<PlusIcon className="size-6 text-white" />}
              size="lg"
              // onClick={() => router.push('/projects/create')}
            >
              Add Category
            </Button>
            <Button
              className="my-auto ml-auto h-14 rounded-2xl bg-main-blue text-white shadow-md"
              startContent={<PlusIcon className="size-6 text-white" />}
              size="lg"
              // onClick={() => router.push('/projects/create')}
            >
              Add Task
            </Button>
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
    </main>
  );
};

export default WBS;

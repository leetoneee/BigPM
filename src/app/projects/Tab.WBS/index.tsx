import { getTaskGroupsByProjectId } from '@/data/task-group.data';
import { ReorderItemType, TasksInGroup } from '@/data/task-group.type';
import { Chip } from '@nextui-org/react';
import { Reorder } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import RenderGroupTasks from './RenderGroupTasks';
import { isTasksInGroup } from '@/helpers/isTasksInGroup';
import RenderTask from './RenderTask';
import { Task } from '@/data/tasks.type';

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

  return (
    <main className="flex h-full flex-col items-center p-3 sm:items-start">
      {/* Thống kê và search */}
      <div className="flex w-full flex-col gap-5">
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
        {/* Thống kê */}
        <div className="flex w-full flex-col gap-2 rounded-xl bg-[#F7F9FD] p-5 shadow-xl">
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
      </div>
      <Reorder.Group values={groupTasks} onReorder={setGroupTasks}>
        {groupTasks.map((groupTask) => (
          <Reorder.Item key={groupTask.id} value={groupTask}>
            {isTasksInGroup(groupTask) ? (
              <RenderGroupTasks
                key={`${groupTask.id}-${groupTask.tasks.length}`}
                data={groupTask}
                groupRefs={groupRefs}
                onTaskMove={handleTaskMove}
                groups={groupTasks}
              />
            ) : (
              <RenderTask data={groupTask} />
            )}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </main>
  );
};

export default WBS;

import { TasksInGroup } from '@/data/task-group.type';
import { Task } from '@/data/tasks.type';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
  FolderIcon
} from '@heroicons/react/24/outline';
import { PanInfo, Reorder } from 'framer-motion';
import { data } from 'framer-motion/client';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import RenderTask from './RenderTask';

type Props = {
  data: TasksInGroup;
  groups: TasksInGroup[];
  groupRefs: React.MutableRefObject<{
    [key: number]: HTMLDivElement | null;
  }>;
  onTaskMove: (task: Task, targetGroupId: number) => void;
};

const RenderGroupTasks = ({ data, groups, groupRefs, onTaskMove }: Props) => {
  const [group, setGroup] = useState<TasksInGroup>(data);
  const [tasks, setTasks] = useState<Task[]>(data.tasks);
  const [expanded, setExpanded] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Data changed:', data);
  }, [data]);

  const handleShowOrHideTasks = () => {
    setExpanded(!expanded);
  };

  const handleDragEnd = (info: PanInfo, task: Task) => {
    const dropPosition = info.point; // Use PanInfo's `point` directly for drop coordinates
    // Check each group's bounding box to see if dropPosition is inside
    for (const group of groups) {
      const groupElement = groupRefs.current[group.id];
      if (groupElement) {
        const rect = groupElement.getBoundingClientRect();
        if (
          dropPosition.x >= rect.left &&
          dropPosition.x <= rect.right &&
          dropPosition.y >= rect.top &&
          dropPosition.y <= rect.bottom
        ) {
          // Task is dropped inside this group's bounding box
          if (group.id !== data.id) {
            // Only move if it's a different group
            onTaskMove(task, group.id);
          }
          return;
        }
      }
    }
  };

  return (
    <div
      ref={(el) => {
        groupRefs.current[data.id] = el;
      }}
      className="w-full"
    >
      <div
        className="flex h-[72px] cursor-pointer flex-row items-center justify-between bg-second-blue py-2 text-on-primary"
        onClick={handleShowOrHideTasks}
      >
        <div className="flex basis-[40%] flex-row items-center justify-between py-4">
          <div className="flex flex-row truncate text-ellipsis whitespace-nowrap text-left pl-4 text-xl font-normal text-on-secondary">
            {expanded ? (
              <div className="mr-[18px] rounded-full">
                <ChevronUpIcon className="size-6" />
              </div>
            ) : (
              <div className="mr-[18px] rounded-full">
                <ChevronDownIcon className="size-6" />
              </div>
            )}
            {group.name.toUpperCase()}
          </div>
          <div className="h-[72px] place-content-center">
            <EllipsisVerticalIcon className="m-2 size-6" />
          </div>
        </div>
        <div className="basis-[60%] items-center truncate text-ellipsis whitespace-nowrap px-14 py-4 text-left font-bold"></div>
      </div>

      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${tasks.length > 0 ? "" : expanded ? "min-h-20": "min-h-0"}`}
        style={{
          maxHeight: expanded ? `${contentRef.current?.scrollHeight}px` : '0px'
        }}
      >
        <Reorder.Group
          axis="y"
          values={tasks}
          onReorder={setTasks}
        >
          {tasks.map((task) => (
            <Reorder.Item
              key={task.id}
              value={task}
              onDragEnd={
                (event, info) => handleDragEnd(info, task) // Pass PanInfo directly to handleDragEnd
              }
            >
              <RenderTask data={task} />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
};

export default RenderGroupTasks;

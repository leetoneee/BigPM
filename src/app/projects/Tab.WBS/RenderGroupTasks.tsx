import { TasksInGroup } from '@/data/task-group.type';
import { Task } from '@/data/tasks.type';
import {
  ChevronDownIcon,
  ChevronUpIcon,
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

type Props = {
  data: TasksInGroup;
  groups: TasksInGroup[];
  groupRefs: React.MutableRefObject<{
    [key: number]: HTMLDivElement | null;
  }>;
  onTaskMove: (task: Task, targetGroupId: number) => void;
};

const RenderGroupTasks = ({ data, groups, groupRefs, onTaskMove }: Props) => {
  {
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

      console.log('🚀 ~ handleDragEnd ~ dropPosition:', dropPosition);
      // Check each group's bounding box to see if dropPosition is inside
      for (const group of groups) {
        const groupElement = groupRefs.current[group.id];
        console.log('🚀 ~ handleDragEnd ~ groupRefs:', groupRefs);
        console.log('🚀 ~ handleDragEnd ~ groupElement:', groupElement);
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
        className="mt-4 w-full sm:max-w-[100%] sm:flex-row md:max-w-[80%] lg:max-w-[60%]"
      >
        <div
          className="flex h-[80px] cursor-pointer items-center justify-between rounded-xl border-2 border-outline-focus bg-primary px-4 py-2 text-on-primary"
          onClick={handleShowOrHideTasks}
        >
          <div className="flex max-w-[90%] items-center">
            <span className="rounded-full bg-secondary p-2">
              <FolderIcon className="size-6 stroke-2" />
            </span>
            <div className="ml-4 mr-9 flex flex-1 flex-col overflow-hidden">
              <div>
                <span className="overflow-hidden truncate text-ellipsis whitespace-nowrap text-2xl">
                  {data.name}
                </span>
              </div>
              <p className="text-sm">{`${data.tasks.length} tasks`}</p>
            </div>
          </div>

          <div className="flex items-center">
            {expanded ? (
              <div className="rounded-full border-2 border-primary-container p-2">
                <ChevronUpIcon className="size-4" />
              </div>
            ) : (
              <div className="rounded-full border-2 border-primary-container p-2">
                <ChevronDownIcon className="size-4" />
              </div>
            )}
          </div>
        </div>

        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: expanded
              ? `${contentRef.current?.scrollHeight}px`
              : '0px'
          }}
        >
          <Reorder.Group
            axis="y"
            values={data.tasks}
            onReorder={(newTasks) => {
              newTasks.forEach((task) => onTaskMove(task, data.id));
            }}
            className="pl-8"
          >
            {data.tasks.map((task) => (
              <Reorder.Item
                key={task.id}
                value={task}
                className="z-50"
                onDragEnd={
                  (event, info) => handleDragEnd(info, task) // Pass PanInfo directly to handleDragEnd
                }
              >
                <div className="mb-2 flex items-center rounded-md bg-white p-2 shadow">
                  <span className="text-sm">{task.name}</span>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </div>
    );
  }
};

export default RenderGroupTasks;

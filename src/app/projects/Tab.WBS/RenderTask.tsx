import { Task } from '@/data/tasks.type';
import { formatDate } from '@/helpers/formatDate';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Chip, Image } from '@nextui-org/react';
// import Image from 'next/image';
import React, { ReactNode, useCallback, useState } from 'react';

type Props = {
  data: Task;
};

const RenderTask = ({ data }: Props) => {
  const [task, setTask] = useState<Task>(data);

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
    <div className="flex h-[72px] flex-row bg-white hover:bg-[#F7F9FD]/10">
      <div className="flex basis-[40%] flex-row items-center justify-between py-4">
        <span className="truncate text-ellipsis whitespace-nowrap pl-14 text-left text-lg text-on-secondary">
          {task.name}
        </span>
        <div className="h-[72px] place-content-center">
          <EllipsisVerticalIcon className="m-2 size-6" />
        </div>
      </div>
      <div className="flex basis-[12%] flex-row items-center justify-center py-4">
        {renderChip(task.status)}
      </div>
      <div className="flex basis-[12%] flex-row items-center justify-center py-4">
        {task.progress}%
      </div>
      <div className="flex basis-[12%] flex-row items-center justify-center py-4">
        {new Date(task.startDate).toLocaleDateString('vi-VE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })}
      </div>
      <div className="flex basis-[12%] flex-row items-center justify-center py-4">
        {task.completionDate
          ? new Date(task.completionDate).toLocaleDateString('vi-VE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })
          : ''}
      </div>
      <div className="flex basis-[12%] flex-col items-start justify-center py-4 gap-2">
        {task.assignees.map((assignee) => {
          return (
            <div key={assignee.id} className="flex flex-row gap-2">
              <Image alt="avt" src={assignee.avatar} width={24} height={24} />
              <span className="text-sm font-normal">{assignee.staffName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RenderTask;

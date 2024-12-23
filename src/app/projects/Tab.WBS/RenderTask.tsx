import { Task } from '@/data/tasks.type';
import { formatDate } from '@/helpers/formatDate';
import {
  EllipsisVerticalIcon,
  EyeIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import {
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  useDisclosure
} from '@nextui-org/react';
// import Image from 'next/image';
import React, { ReactNode, useCallback, useState } from 'react';
import ViewTaskModal from './ViewTaskModal.view';
import DeleteTaskModal from './Modal.Task/DeleteTask.modal';
import { toast } from 'react-toastify';

type Props = {
  data: Task;
};

const RenderTask = ({ data }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  //!  CONTROL Delete modal
  const {
    isOpen: isOpenD,
    onOpen: onOpenD,
    onOpenChange: onOpenChangeD,
    onClose: onCloseD
  } = useDisclosure();
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

  const handleDeleted = () => {
    toast.success('Task has been deleted successfully');
  };

  return (
    <div className="flex h-[72px] flex-row bg-white hover:bg-[#F7F9FD]/10">
      <div className="flex basis-[40%] flex-row items-center justify-between py-4">
        <span className="truncate text-ellipsis whitespace-nowrap pl-14 text-left text-lg text-on-secondary">
          {task.name}
        </span>
        <div className="h-[72px] place-content-center">
          <Dropdown>
            <DropdownTrigger>
              <EllipsisVerticalIcon className="m-2 size-6 rounded-md hover:cursor-pointer hover:bg-on-container-focus/10 hover:brightness-110" />
            </DropdownTrigger>
            <DropdownMenu variant="solid" aria-label="Dropdown menu with icons">
              <DropdownItem
                key="new"
                startContent={<EyeIcon className={'size-6 text-primary'} />}
                onClick={onOpen}
              >
                View
              </DropdownItem>
              <DropdownItem
                key="copy"
                startContent={<TrashIcon className={'size-6 text-danger'} />}
                onClick={onOpenD}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
      <div className="flex basis-[12%] flex-col items-start justify-center gap-2 py-4">
        {task.assignees.map((assignee) => {
          return (
            <div key={assignee.id} className="flex flex-row gap-2">
              <Image
                alt="avt"
                src={assignee.asigneeAvatar}
                width={24}
                height={24}
              />
              <span className="text-sm font-normal">
                {assignee.assigneeName}
              </span>
            </div>
          );
        })}
      </div>
      <ViewTaskModal
        key={isOpen ? `${task.id}` : null}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        taskId={task.id}
      />
      {/* Delete Task Modal */}
      {isOpenD && (
        <DeleteTaskModal
          isOpen={isOpenD}
          onOpen={onOpenD}
          onClose={onCloseD}
          onOpenChange={onOpenChangeD}
          taskId={task.id}
          taskTitle={task.name}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
};

export default RenderTask;

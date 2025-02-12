'use client';

import button, { useContext, useEffect, useRef, useState } from 'react';
import * as React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalContent
} from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { TasksInGroup } from '@/data/task-group.type';
import { AppContext } from '@/contexts';
import { removeCategory } from '@/helpers/removeCategory';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  categoryId: number;
  categoryName: string;
  onDeleted?: () => void;
};

type GroupTasksType = {
  groupTasks: TasksInGroup[];
  setGroupTasks: React.Dispatch<React.SetStateAction<TasksInGroup[]>>;
};

export default function DeleteCategoryModal({
  isOpen,
  onOpen,
  onOpenChange,
  onClose,
  categoryId,
  categoryName,
  onDeleted
}: Props) {
  const { groupTasks, setGroupTasks } = useContext(
    AppContext
  ) as GroupTasksType;

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<number>();

  useEffect(() => {
    if (categoryId && categoryName) {
      setName(categoryName);
      setId(categoryId);
    }
  }, [categoryId, categoryName]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = removeCategory(groupTasks, categoryId);
      setGroupTasks(result);
      if (true) {
        handleClose();
        if (onDeleted) {
          onDeleted(); // Thông báo cho parent component
        }
      }
    } catch (error: any) {
      console.error('🚫 ~ handleDelete ~ Error:', error);
      toast.error(
        error.response?.data?.message ||
          'Failed to delete course. Please try again.'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    // Đóng modal
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="h-11 w-11 content-center rounded-full border-5 border-[#FEE4E2] bg-red-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mx-auto size-6"
                  color="red"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-2">
                <div className="text-lg font-semibold">Remove task</div>
                <div className="text-sm font-normal">
                  Are you sure you want to remove the category{' '}
                  <strong>{categoryName}</strong>? All tasks in this category
                  wil be removed. This action cannot be undone.
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="mb-4 flex justify-between space-x-6 py-4">
              <Button
                onPress={handleClose}
                className="hover:bg-highlight w-1/2 rounded-lg border border-outline bg-white py-2 text-[16px] font-medium text-black"
              >
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleDelete}
                disabled={isDeleting}
                className="w-1/2 rounded-lg border border-outline bg-danger py-2 text-[16px] font-medium text-white"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

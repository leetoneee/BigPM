'use client';

import button, { useContext, useEffect, useRef, useState } from 'react';
import * as React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Divider,
  Checkbox,
  Textarea,
  Input,
  SelectItem,
  Select,
  Selection,
  Button
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import { addCategory } from '@/helpers/addCategory';
import { TaskGroup, TasksInGroup } from '@/data/task-group.type';
import { AppContext } from '@/contexts';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  onCreated?: () => void; // Callback báo cho parent biết đã tạo xong
};

type GroupTasksType = {
  groupTasks: TasksInGroup[];
  setGroupTasks: React.Dispatch<React.SetStateAction<TasksInGroup[]>>;
};

export default function AddCategoryModal({
  isOpen,
  onOpen,
  onOpenChange,
  onClose,
  onCreated
}: Props) {
  const { groupTasks, setGroupTasks } = useContext(
    AppContext
  ) as GroupTasksType;

  const [name, setName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<{
    name: string;
  }>({
    name: ''
  });

  const validateInputs = () => {
    const newErrors = { ...errors };

    newErrors.name = name.trim() === '' ? 'category name is required' : '';

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      // Handle form submission logic here
      try {
        setIsSubmitting(true); // Bắt đầu gửi yêu cầu
        // Gọi API và đợi kết quả
        const category: TaskGroup = {
          id: groupTasks.length + 1,
          name,
          projectId: 1,
          order: groupTasks.length + 1
        };
        const result = addCategory(groupTasks, category);
        setGroupTasks(result);
        if (true) {
          handleClose();
          if (onCreated) {
            onCreated();
          }
        }
      } catch (error: any) {
        console.error('🚫 ~ onSubmit ~ Error:', error);
        toast.error(
          error.response?.data?.message ||
            'Failed to create category. Please try again.'
        );
      } finally {
        setIsSubmitting(false); // Hoàn tất gửi yêu cầu
      }
    } else {
      console.log('Form has errors. Fix them to proceed.');
    }
  };

  const handleClose = () => {
    setName('');
    setErrors({
      name: ''
    });
    // Đóng modal
    onClose();
  };

  const renderError = (field: keyof typeof errors) =>
    errors[field] && (
      <span className="absolute bottom-[-20px] left-2 h-4 min-w-max text-sm text-danger">
        {errors[field]}
      </span>
    );

  return (
    <Modal
      size={'lg'}
      isOpen={isOpen}
      radius="lg"
      onOpenChange={onOpenChange}
      onClose={handleClose}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      classNames={{
        body: 'py-5 px-6 bg-white border-outline-var',
        backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
        base: 'border-outline-var bg-outline-var',
        header: 'border-b-[1px] border-border bg-white',
        footer: 'border-t-[1px] border-border bg-white'
        // closeButton: 'hover:bg-on-primary/5 active:bg-on-primary/10 disable'
      }}
    >
      <ModalContent>
        <ModalHeader className="w-full rounded-t-xl border">
          <div className="border-b--b-primary h-11 w-11 content-center rounded-lg border-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mx-auto size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
              />
            </svg>
          </div>
          <div className="ml-5">
            <div className="text-lg font-semibold">Add new category</div>
            <div className="text-wrap text-sm font-normal">
              Create a new category to structure tasks and assign tasks for
              employee.
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-7">
            {/* category name */}
            <div className="flex flex-row">
              <div className="basis-[30%]">
                <span className="text-sm font-medium text-black">
                  Category name<span className="text-danger">*</span>
                </span>
              </div>
              <div className="relative basis-[70%]">
                <Input
                  type="text"
                  className="w-full rounded-lg"
                  placeholder="Enter category name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {renderError('name')}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex w-full flex-row justify-between space-x-6">
            <Button
              onPress={handleClose}
              className="hover:bg-highlight w-1/2 rounded-lg border border-outline bg-white py-2 text-[16px] font-medium text-black"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleSubmit}
              className="w-1/2 rounded-lg border border-outline bg-primary py-2 text-[16px] font-medium text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Create'}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

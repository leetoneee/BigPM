import { convertSize, File } from '@/data/files.type';
import { files as filesData } from '@/data/files.data';
import { Comment } from '@/data/comments.type';
import {
  comments as commentsData,
  getCommentsByTaskId
} from '@/data/comments.data';
import {
  getAllTaskGroups,
  getCategoriesByProjectId,
  getCategoryById
} from '@/data/task-group.data';
import { TaskGroup, TasksInGroup } from '@/data/task-group.type';
import { getTaskById } from '@/data/tasks.data';
import { Task } from '@/data/tasks.type';
import {
  DocumentTextIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  Selection,
  SelectItem,
  Textarea,
  Tooltip,
  useDisclosure
} from '@nextui-org/react';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/contexts';
import { getCategoryList } from '@/helpers/getCategoryList';
import { findTaskInGroupTasks } from '@/helpers/findTaskInGroupTasks';
import TaskAssigneeModal from './task-assignee';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  taskId: number;
};

type GroupTasksType = {
  groupTasks: TasksInGroup[];
  setGroupTasks: React.Dispatch<React.SetStateAction<TasksInGroup[]>>;
};

export type ChipAvatar = {
  id: number;
  assigneeName: string;
  asigneeAvatar: string;
};

const ViewTaskModal = ({ isOpen, onOpen, onOpenChange, taskId }: Props) => {
  const { groupTasks, setGroupTasks } = useContext(
    AppContext
  ) as GroupTasksType;
  const {
    isOpen: isOpenT,
    onOpen: onOpenT,
    onOpenChange: onOpenChangeT
  } = useDisclosure();

  const handleSave = () => {};
  const handleClose = () => {};
  const [categories, setCategories] = useState<TaskGroup[]>([]);

  const [task, setTask] = useState<Task>();
  const [taskName, setTaskName] = useState<string>('');
  const [category, setCategory] = useState<Selection>(new Set(['']));
  const [earlyStart, setEarlyStart] = useState<string>('');
  const [lateStart, setLateStart] = useState<string>('');
  const [earlyFinish, setEarlyFinish] = useState<string>('');
  const [lateFinish, setLateFinish] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [progress, setProgress] = useState<string>('');
  const [completeTime, setCompleteTime] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<Selection>(
    new Set(['All'])
  );
  const selectedValue = React.useMemo(
    () => Array.from(selectedStatus).join(', ').replaceAll('_', ' '),
    [selectedStatus]
  );

  const selectedCategory = React.useMemo(
    () => Array.from(category).join(', ').replaceAll('_', ' '),
    [category]
  );
  const [assignees, setAssignees] = useState<ChipAvatar[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState<string>('');

  useEffect(() => {
    if (groupTasks.length > 0) {
      const data = getCategoryList(groupTasks);
      console.log('🚀 ~ useEffect ~ data:', data);
      setCategories(data);
    }
  }, [groupTasks]);

  useEffect(() => {
    const data = findTaskInGroupTasks(groupTasks, taskId);
    if (data) setTask(data);
  }, [taskId]);

  useEffect(() => {
    setFiles(filesData);
  }, [filesData]);

  useEffect(() => {
    setComments(getCommentsByTaskId(taskId));
  }, [taskId]);

  useEffect(() => {
    if (task) {
      setTaskName(task.name);

      const category = getCategoryById(task.taskGroupId);
      if (category) {
        setCategory(new Set([category.name]));
      }

      const parseDate = (dateString: any) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date;
      };

      const earlyStartDate = parseDate(task.earlyStart);
      const lateStartDate = parseDate(task.lateStart);
      const earlyFinishDate = parseDate(task.earlyFinish);
      const lateFinishDate = parseDate(task.lateFinish);
      const startDate = parseDate(task.startDate);
      const completionDate = parseDate(task.completionDate);

      if (earlyStartDate)
        setEarlyStart(earlyStartDate.toISOString().split('T')[0]);
      if (earlyFinishDate)
        setEarlyFinish(earlyFinishDate.toISOString().split('T')[0]);
      if (lateStartDate)
        setLateStart(lateStartDate.toISOString().split('T')[0]);
      if (lateFinishDate)
        setLateFinish(lateFinishDate.toISOString().split('T')[0]);
      if (startDate) setStartDate(startDate.toISOString().split('T')[0]);
      if (completionDate)
        setEndDate(completionDate.toISOString().split('T')[0]);

      if (completionDate && startDate) {
        const differenceInMs = completionDate.getTime() - startDate.getTime();
        const completeTime = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
        setCompleteTime(completeTime.toString());
      }

      setProgress(task.progress.toString());
      setDescription(task.description);
      setAssignees(task.assignees);
    }
  }, [task]);

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="lg"
      size="5xl"
      scrollBehavior="outside"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton
      classNames={{
        body: 'p-6 bg-white border-outline-var',
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
              <span className="text-4xl font-semibold">Task Information</span>
              <XMarkIcon
                className="size-10 hover:cursor-pointer"
                onClick={onClose}
              />
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-6">
                <div className="flex flex-row gap-10">
                  {/* Project Name */}
                  <div className="flex w-full shrink basis-[70%] flex-col gap-2">
                    <span className="text-2xl font-semibold text-on-primary">
                      Task Name
                    </span>
                    <input
                      type="text"
                      className="h-12 w-full rounded-2xl border border-outline/50 p-5 text-base sm:h-12 sm:text-xl"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                    />
                  </div>
                  {/* Category */}
                  <div className="flex w-full shrink basis-[30%] flex-col gap-2">
                    <span className="text-2xl font-semibold text-on-primary">
                      Category
                    </span>
                    <Select
                      variant="bordered"
                      placeholder={selectedCategory}
                      selectedKeys={category}
                      className="bg-b-primary w-96"
                      onSelectionChange={setCategory}
                      size="lg"
                    >
                      {categories.map((category) => (
                        <SelectItem key={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="flex flex-row justify-between gap-4">
                  {/*  Early Start */}
                  <div className="flex w-full shrink flex-col gap-2">
                    <span className="text-2xl font-semibold text-on-primary">
                      Early Start
                    </span>
                    <input
                      type="date"
                      className="h-12 w-full rounded-2xl border border-outline/50 p-5 text-base sm:h-12 sm:text-xl"
                      value={earlyStart}
                      onChange={(e) => setEarlyStart(e.target.value)}
                    />
                  </div>
                  {/* Early Finish */}
                  <div className="flex w-full shrink flex-col gap-2">
                    <span className="text-2xl font-semibold text-on-primary">
                      Early Finish
                    </span>
                    <input
                      type="date"
                      className="h-12 w-full rounded-2xl border border-outline/50 p-5 text-base sm:h-12 sm:text-xl"
                      value={earlyFinish}
                      onChange={(e) => setEarlyFinish(e.target.value)}
                    />
                  </div>
                  {/* Late Start */}
                  <div className="flex w-full shrink flex-col gap-2">
                    <span className="text-2xl font-semibold text-on-primary">
                      Late Start
                    </span>
                    <input
                      type="date"
                      className="h-12 w-full rounded-2xl border border-outline/50 p-5 text-base sm:h-12 sm:text-xl"
                      value={lateStart}
                      onChange={(e) => setLateStart(e.target.value)}
                    />
                  </div>
                  {/* Late Finish */}
                  <div className="flex w-full shrink flex-col gap-2">
                    <span className="text-2xl font-semibold text-on-primary">
                      Late Finish
                    </span>
                    <input
                      type="date"
                      className="h-12 w-full rounded-2xl border border-outline/50 p-5 text-base sm:h-12 sm:text-xl"
                      value={lateFinish}
                      onChange={(e) => setLateFinish(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between gap-4">
                  {/*  Start Date */}
                  <div className="flex w-full shrink flex-col gap-2">
                    <span className="text-2xl font-semibold text-on-primary">
                      Start Date
                    </span>
                    <input
                      type="date"
                      className="h-12 w-full rounded-2xl border border-outline/50 p-5 text-base sm:h-12 sm:text-xl"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  {/* End Date */}
                  <div className="flex w-full shrink flex-col gap-2">
                    <span className="text-2xl font-semibold text-on-primary">
                      End Date
                    </span>
                    <input
                      type="date"
                      className="h-12 w-full rounded-2xl border border-outline/50 p-5 text-base sm:h-12 sm:text-xl"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  {/* Progress */}
                  <div className="flex w-full shrink flex-col gap-2">
                    <span className="text-2xl font-semibold text-on-primary">
                      Progress
                    </span>
                    <input
                      type="text"
                      className="h-12 w-full rounded-2xl border border-outline/50 p-5 text-base sm:h-12 sm:text-xl"
                      value={progress}
                      onChange={(e) => setProgress(e.target.value)}
                    />
                  </div>
                  {/* Complete Time */}
                  <div className="flex w-full shrink flex-col gap-2">
                    <span className="text-2xl font-semibold text-on-primary">
                      Complete Time
                    </span>
                    <input
                      type="text"
                      readOnly
                      className="h-12 w-full rounded-2xl border border-outline/50 p-5 text-base sm:h-12 sm:text-xl"
                      value={
                        Number(completeTime) > 0
                          ? `${completeTime + ' days'}`
                          : '0 day'
                      }
                      // onChange={(e) => setLateStart(e.target.value + '%')}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-10">
                  {/* Notes */}
                  <div className="flex w-full shrink flex-col gap-2">
                    <span className="text-2xl font-semibold text-on-primary">
                      Notes
                    </span>
                    <Textarea
                      variant="bordered"
                      className="w-full rounded-2xl text-base"
                      value={description}
                      onValueChange={setDescription}
                    />
                  </div>
                </div>
                {/* Assignees */}
                <div>
                  <div className="flex w-full flex-row gap-5">
                    <span className="text-2xl font-semibold text-on-primary">
                      Assignees
                    </span>
                    <div className="flex w-full flex-wrap gap-4">
                      {assignees.map((assignee) => {
                        const handleClose = (assigneeToRemove: any) => {
                          setAssignees(
                            assignees.filter(
                              (assignee) => assignee !== assigneeToRemove
                            )
                          );
                        };

                        return (
                          <div key={assignee.id}>
                            <Chip
                              variant="flat"
                              className="rounded-md bg-second-blue p-2"
                              avatar={<Avatar src={assignee.asigneeAvatar} />}
                              onClose={() => handleClose(assignee)}
                            >
                              <span className="text-base font-normal text-black">
                                {assignee.assigneeName}
                              </span>
                            </Chip>
                          </div>
                        );
                      })}
                      <button
                        className="rounded-[10px] bg-main-blue p-1 text-white hover:brightness-110"
                        onClick={onOpenT}
                      >
                        <PlusIcon className="size-7 text-white shadow-md" />
                      </button>
                    </div>
                  </div>
                </div>
                <Divider />
                {/* Comment */}
                <div className="flex flex-col">
                  <span className="text-2xl font-semibold text-on-primary">
                    Commemts
                  </span>
                  <div className="my-4 flex flex-col gap-5">
                    {comments.map((comment) => {
                      return (
                        <div
                          key={comment.id}
                          className="flex flex-row items-center justify-between pr-5"
                        >
                          <div className="flex w-full flex-row gap-2">
                            <Avatar src={comment.userAvatar} />
                            <div className="flex w-full flex-col gap-1">
                              <span className="text-base font-semibold">
                                {comment.userName}{' '}
                                <span className="ml-4 text-sm font-light">
                                  {new Date(
                                    comment.updateAt
                                      ? comment.updateAt
                                      : comment.createAt
                                  ).toLocaleString('vi')}{' '}
                                  {comment.updateAt ? '(updated)' : ''}
                                </span>
                              </span>
                              <span>{comment.content}</span>
                            </div>
                          </div>
                          <div className="relative flex items-center justify-center gap-4">
                            <Tooltip content="Details" color="primary">
                              <span className="cursor-pointer text-lg text-warning active:opacity-50">
                                <PencilIcon className="size-5" />
                              </span>
                            </Tooltip>

                            <Tooltip color="danger" content="Delete file">
                              <span className="cursor-pointer text-lg text-danger active:opacity-50">
                                <TrashIcon className="size-5" />
                              </span>
                            </Tooltip>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-row gap-2">
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                    <Input
                      type="text"
                      variant="underlined"
                      placeholder="Add a comment ..."
                      size="lg"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                </div>
                <Divider />
                {/* Attached Files */}
                <div className="flex w-full flex-col">
                  <div className="flex flex-row items-center gap-4">
                    <span className="text-2xl font-semibold text-on-primary">
                      Attached Files
                    </span>
                    <button className="rounded-[10px] bg-main-blue p-1 text-white hover:brightness-110">
                      <PlusIcon className="size-7 text-white shadow-md" />
                    </button>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex flex-row items-center justify-between pr-5 hover:bg-on-container-focus/20"
                      >
                        <div className="flex flex-row items-center gap-4">
                          <DocumentTextIcon className="size-8" />
                          <span className="text-base font-semibold">
                            {file.fileName}.{file.ext}
                          </span>
                          <span className="text-base font-light">
                            {convertSize(file.fileSize)}
                          </span>
                        </div>
                        <div className="relative flex items-center justify-center gap-4">
                          <Tooltip content="Details" color="primary">
                            <span className="cursor-pointer text-lg text-primary active:opacity-50">
                              <EyeIcon className="size-5" />
                            </span>
                          </Tooltip>

                          <Tooltip color="danger" content="Delete file">
                            <span className="cursor-pointer text-lg text-danger active:opacity-50">
                              <TrashIcon className="size-5" />
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <TaskAssigneeModal
                  isOpen={isOpenT}
                  onOpen={onOpenT}
                  onOpenChange={onOpenChangeT}
                  teamMembers={assignees}
                  setTeamMembers={setAssignees}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-main-blue p-5 text-xl text-white shadow-lg"
                onPress={() => {
                  handleSave();
                  onClose();
                }}
              >
                Save
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

export default ViewTaskModal;

import { Task } from '@/data/tasks.type';
import React from 'react'

type Props = {
  data: Task;
};

const RenderTask = ({data}: Props) => {
  return (
    <div>RenderTask</div>
  )
}

export default RenderTask
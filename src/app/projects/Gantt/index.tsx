import React from 'react'

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const Gantt = ({ id, setIsModalNewTaskOpen }: Props) => {
  return (
    <div>Gantt</div>
  )
}

export default Gantt
import React from 'react'

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const Kanban = ({ id, setIsModalNewTaskOpen }: Props) => {
  return (
    <div>Kanban</div>
  )
}

export default Kanban
import React from 'react'

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const Progress = ({ id, setIsModalNewTaskOpen }: Props) => {
  return (
    <div>Progress</div>
  )
}

export default Progress
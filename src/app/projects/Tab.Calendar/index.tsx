import React from 'react'

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const Calendar = ({ id, setIsModalNewTaskOpen }: Props) => {
  return (
    <div>Calendar</div>
  )
}

export default Calendar
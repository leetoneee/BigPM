'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components';
import Image from 'next/image';
import ProjectHeader from '../ProjectHeader';
import Overview from '../Tab.Overview';
import WBS from '../Tab.WBS';
import Calendar from '../Tab.Calendar';
import Gantt from '../Tab.Gantt';
import Kanban from '../Tab.Kanban';
import Progress from '../Tab.Progress';
import { useParams } from 'next/navigation';

type Props = {
  params: { id: string };
};

export default function Projects() {
  const params = useParams<{ id: string }>()

  const { id } = params;

  const [activeTab, setActiveTab] = useState('Overview');
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <main className="flex flex-col items-center gap-8 p-3 sm:items-start">
      <div className="w-full">
        {/* <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      /> */}
        <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'Overview' && (
          <Overview id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        {activeTab === 'WBS' && (
          <WBS id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        {activeTab === 'Kanban' && (
          <Kanban id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        {activeTab === 'Gantt' && (
          <Gantt id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        {activeTab === 'Calendar' && (
          <Calendar id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        {activeTab === 'Progress' && (
          <Progress id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
      </div>
    </main>
  );
}

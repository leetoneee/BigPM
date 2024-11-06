import Header from '@/components/Header';

import React, { useState } from 'react';
import { Breadcrumb, ModalNewProject } from '@/components';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { TabButtonProps } from '@/types';

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);

  return (
    <div className="w-full">
      <ModalNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      />
      <Breadcrumb />
      {/* TABS */}
      <div className="flex w-full flex-wrap-reverse gap-2 border-b pt-2 md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Overview"
            icon={
              <Image
                src={'/icons/overview.svg'}
                alt="overview"
                width={20}
                height={20}
              />
            }
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="WBS"
            icon={
              <Image
                src={'/icons/overview.svg'}
                alt="overview"
                width={20}
                height={20}
              />
            }
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Kanban"
            icon={
              <Image
                src={'/icons/overview.svg'}
                alt="overview"
                width={20}
                height={20}
              />
            }
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Gantt"
            icon={
              <Image
                src={'/icons/overview.svg'}
                alt="overview"
                width={20}
                height={20}
              />
            }
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Calendar"
            icon={
              <Image
                src={'/icons/overview.svg'}
                alt="overview"
                width={20}
                height={20}
              />
            }
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Progress"
            icon={
              <Image
                src={'/icons/overview.svg'}
                alt="overview"
                width={20}
                height={20}
              />
            }
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <div className="flex flex-col">
      <button
        className={`relative flex items-center gap-2 px-1 py-2 text-sm after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full sm:px-2 lg:px-4 ${
          isActive ? 'text-on-primary after:bg-blue-600' : ''
        }`}
        onClick={() => setActiveTab(name)}
      >
        {icon}
        {name}
      </button>
      {isActive && <div className="h-[2px] w-full bg-on-primary mt-2"></div>}
    </div>
  );
};

export default ProjectHeader;

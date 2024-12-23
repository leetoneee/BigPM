'use client';

import { AppContext } from '@/contexts';
import { TasksInGroup } from '@/data/task-group.type';
import { useState } from 'react';

function AppProvider({ children }: { children: React.ReactNode }) {
  const [groupTasks, setGroupTasks] = useState<TasksInGroup[]>([]);

  return (
    <AppContext.Provider
      value={{
        groupTasks,
        setGroupTasks
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;

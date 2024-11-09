'use client';

import { AppContext } from '@/contexts';
import { useState } from 'react';

function AppProvider({ children }: { children: React.ReactNode }) {

  return (
    <AppContext.Provider
      value={{

      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;

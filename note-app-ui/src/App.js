import React, { useState, createContext, useMemo } from 'react';
import { editNote } from './api';

import Home from './components/Home';

export const AppContext = createContext({
  refreshData: false,
  setRefreshData: () => {},
  editNote: undefined,
  setEditNote: () => {}
});

function App() {
  const [refreshData, setRefreshData] = useState(true);
  const [editNote, setEditNote] = useState(undefined);
  const value = useMemo(() => ({ refreshData, setRefreshData, editNote, setEditNote }), [refreshData, editNote]);

  return (
    <AppContext.Provider value={value}>
      <Home />;
    </AppContext.Provider>
  );
}

export default App;

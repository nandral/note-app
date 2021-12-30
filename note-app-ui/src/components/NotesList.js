import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import { Box, Text } from '@chakra-ui/react';
import Note from './Note';
import { getNotes } from '../api';

const NotesList = () => {
  const { refreshData, setRefreshData } = useContext(AppContext);
  const [notes, setNotes] = useState();
  useEffect(() => {
    if (refreshData) {
      fetchNotes();
    }
  });

  const fetchNotes = async () => {
    const notesFromApi = await getNotes();
    if (notesFromApi && Array.isArray(notesFromApi)) {
      setNotes(notesFromApi);
      setRefreshData(false);
    }
  };

  return (
    <Box>
      {refreshData && <Text>Loading data ..</Text>}
      {notes && notes.length > 0 && notes.map(({ id, data }) => <Note key={id} id={id} data={data} />)}
    </Box>
  );
};

export default NotesList;

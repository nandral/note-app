import React, { useContext } from 'react';

import { Container, Box, Heading } from '@chakra-ui/react';
import Add from './Add';
import NotesList from './NotesList';
import Edit from './Edit';
import { AppContext } from '../App';
import EditNote from './Edit';

const Home = () => {
  const { editNote } = useContext(AppContext);
  return (
    <Container>
      <Box mt={4}>
        <Heading as="h2">Note taking app</Heading>
        <Add />
        {editNote && <EditNote id={editNote.id} data={editNote.data} />}
        <NotesList />
      </Box>
    </Container>
  );
};

export default Home;

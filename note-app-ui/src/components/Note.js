import React, { useState, useContext } from 'react';
import { Box, Flex, Select, IconButton, Text, useToast } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { deleteNote } from '../api';
import { AppContext } from '../App';

const Note = ({ id, data }) => {
  const [bg, setBg] = useState('red.100');
  const { setRefreshData, setEditNote } = useContext(AppContext);
  const toast = useToast();

  return (
    <Box my={5} border="1px" borderColor="gray.200" borderRadius={5} p={5} bg={bg}>
      <Flex justifyContent="flex-end" alignItems="center" mt={2}>
        <IconButton
          aria-label="Edit"
          variant="outline"
          icon={<EditIcon />}
          mr={3}
          onClick={() => {
            setEditNote({ id, data });
          }}
        />
        <IconButton
          aria-label="Delete"
          variant="outline"
          icon={<DeleteIcon />}
          onClick={() => {
            deleteNote(id);
            setRefreshData(true);
            toast({
              title: 'Note deleted !',
              status: 'success',
              duration: 5000,
              isClosable: true
            });
          }}
        />
      </Flex>
      <Text mt={5} fontSize="lg">
        {data}
      </Text>

      <Flex justifyContent="flex-end" alignItems="center" mt={5}>
        <Text fontSize="sm">Theme:&nbsp;</Text>
        <Select
          placeholder="Select color"
          onChange={(e) => setBg(e.target.value)}
          defaultValue="red.100"
          width={100}
          size="xs"
          borderColor="gray.300"
        >
          <option value="red.100">Red</option>
          <option value="green.100">Green</option>
          <option value="blue.100">Blue</option>
          <option value="teal.100">Teal</option>
          <option value="yellow.100">Yellow</option>
        </Select>
      </Flex>
    </Box>
  );
};

export default Note;

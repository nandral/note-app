import React, { useState, useContext } from 'react';

import {
  Box,
  Flex,
  Button,
  Textarea,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Divider,
  useToast
} from '@chakra-ui/react';
import { AppContext } from '../App';
import { addNote } from '../api';

const Add = () => {
  const [showAdd, setAdd] = useState(false);
  let [value, setValue] = React.useState('');
  let [error, setError] = React.useState('');
  const toast = useToast();
  const { setRefreshData } = useContext(AppContext);

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
    setError('');
  };

  const handleSubmit = async () => {
    if (!value || value.trim() === '') {
      setError('Note is required');
      return;
    } else {
      setError('');
      const { id, error } = await addNote(value);
      if (id) {
        toast({
          title: 'New note added successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        setValue('');
        setRefreshData(true);
        setAdd(false);
      } else {
        toast({
          title: error,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      }
    }
  };

  return (
    <Box my={4}>
      <Button colorScheme="teal" size="md" onClick={() => setAdd(!showAdd)}>
        Add New Note
      </Button>
      <Divider my={5} />
      {showAdd && (
        <Box my={5} border="1px" borderColor="gray.200" borderRadius={5} p={5}>
          <FormControl isInvalid={error} onSubmit={handleSubmit}>
            <FormLabel htmlFor="note">New note</FormLabel>

            <Textarea
              id="note"
              value={value}
              onChange={handleInputChange}
              placeholder="Please add you note here .."
              size="sm"
            />

            {!error ? (
              <FormHelperText>Please click submit to add your new note.</FormHelperText>
            ) : (
              <FormErrorMessage>Note is required.</FormErrorMessage>
            )}
            <Flex justifyContent="flex-end">
              <Button mt={4} colorScheme="teal" size="sm" onClick={handleSubmit}>
                Submit
              </Button>
            </Flex>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default Add;

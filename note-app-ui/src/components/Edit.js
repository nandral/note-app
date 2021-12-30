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
  useToast
} from '@chakra-ui/react';
import { AppContext } from '../App';
import { editNote } from '../api';

const EditNote = ({ id: inputId, data }) => {
  let [value, setValue] = React.useState(data);
  let [error, setError] = React.useState('');
  const toast = useToast();
  const { setRefreshData, setEditNote } = useContext(AppContext);

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
      console.log('submit ... ', inputId, value);
      const { id, error } = await editNote({ id: inputId, data: value });
      if (id) {
        toast({
          title: 'Note updated !',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        setValue('');
        setRefreshData(true);
        setEditNote(undefined);
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
      <Box my={5} border="1px" borderColor="gray.200" borderRadius={5} p={5}>
        <FormControl isInvalid={error} onSubmit={handleSubmit}>
          <FormLabel htmlFor="note">Edit note </FormLabel>

          <Textarea
            id="note"
            value={value}
            onChange={handleInputChange}
            placeholder="Please add you note here .."
            size="sm"
          />

          {!error ? (
            <FormHelperText>Please click Save to update your note.</FormHelperText>
          ) : (
            <FormErrorMessage>Note is required.</FormErrorMessage>
          )}
          <Flex justifyContent="flex-end">
            <Button mt={4} colorScheme="teal" size="sm" onClick={handleSubmit}>
              Save
            </Button>
          </Flex>
        </FormControl>
      </Box>
    </Box>
  );
};

export default EditNote;

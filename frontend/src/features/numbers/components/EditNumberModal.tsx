import React from 'react';

import { Box, Button, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { useEditNumberMutation } from '../api';

interface EditNumberModalProps {
  number?: { id: string; number: string };
  open: boolean;
  onClose: () => void;
}

const EditNumberModal: React.FC<EditNumberModalProps> = ({ number, open, onClose }) => {
  const [updateNumber] = useEditNumberMutation(); // Ensure this matches the mock structure

  const handleSave = () => {
    if (number) {
      updateNumber({ id: number.id, number: number.number });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Number</DialogTitle>
      <DialogContent>
        <Box>
          <TextField label="Number" defaultValue={number?.number} />
          <Button onClick={handleSave}>
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditNumberModal;

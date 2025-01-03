import React from "react";
import { Box, Button, Dialog, Stack, Typography } from "@mui/material";
import SecondaryButton from "../UI/SecondaryButton";
import PrimaryButton from "../UI/PrimaryButton";

interface EditNumberModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onAction: () => void;
  description: string;
  actionName: string;
}

const ConfirmationModal = ({
  open,
  onClose,
  title,
  description,
  onAction,
  actionName,
}: EditNumberModalProps): JSX.Element => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Box padding={3} display="flex" flexDirection="column">
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {description}
        </Typography>
        <Stack direction={"row"} spacing={2} justifyContent="flex-end" mt={2}>
          <SecondaryButton onClick={onClose} >
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={onAction}>
            {actionName}
          </PrimaryButton>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default ConfirmationModal;

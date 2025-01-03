import React from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface SnackbarHandlerProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: () => void;
  autoHideDuration?: number; // Optional, defaults to 4000ms
}

const SnackbarHandler: React.FC<SnackbarHandlerProps> = ({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 4000,
}) => (
  <Snackbar
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={onClose}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
  >
    <Alert
      onClose={onClose}
      severity={severity}
      sx={{ width: "100%" }}
    >
      {message}
    </Alert>
  </Snackbar>
);

export default SnackbarHandler;

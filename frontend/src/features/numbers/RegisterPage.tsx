import { useState } from "react";
import { Box } from "@mui/material";
import { SingleNumberForm } from "./components/SingleNumberForm";
import { MultipleNumbersForm } from "./components/MultipleNumbersForm";
import SnackbarHandler from "../../components/UI/Snackbar";
import Title from "../../components/UI/Title";

export default function RegisterPage() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  // Single success /error callbacks
  const handleSuccess = (message: string) => {
    setSnackbarSeverity("success");
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleError = (message: string) => {
    setSnackbarSeverity("error");
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <Box maxWidth="600px" mx={{ sm: 'auto', xs: 4 }} mt={4}>
      <Title
        title="Number Onboarding Form"
        subtitle="Use this form to add one or more telephone numbers to the database.
        Enter a single number for quick submission, or paste multiple
        comma-separated numbers into the text area."
      />

      <SingleNumberForm onSuccess={handleSuccess} onError={handleError} />

      <MultipleNumbersForm onSuccess={handleSuccess} onError={handleError} />

      {/* Global Snackbar */}
      <SnackbarHandler
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
}

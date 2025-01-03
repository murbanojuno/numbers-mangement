import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Number, useEditNumberMutation } from "../../../api/numbersApi";
import SnackbarHandler from "../../../components/UI/Snackbar";
import PrimaryButton from "../../../components/UI/PrimaryButton";
import SecondaryButton from "../../../components/UI/SecondaryButton";

interface EditNumberModalProps {
  open: boolean;
  onClose: () => void;
  number?: Number;
}

const EditNumberModal = ({
  open,
  onClose,
  number,
}: EditNumberModalProps): JSX.Element => {
  const [updateNumber] = useEditNumberMutation();

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      number: number?.number || "",
      prefix: number?.prefix || "",
      country: number?.country || "",
      company: number?.company || "",
      description: number?.description || "",
    },
  });

  // Update the form whenever the `number` prop changes
  useEffect(() => {
    if (number) {
      reset({
        number: number.number,
        prefix: number.prefix,
        country: number.country,
        company: number.company,
        description: number.description,
      });
    }
  }, [number, reset]);

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  const onSubmit = async (data: any) => {
    try {
      await updateNumber({ ...number, ...data }).unwrap();
      setSnackbarMessage("Number updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      onClose();
    } catch (err) {
      console.error(err);
      setSnackbarMessage("Failed to update the number.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <Box padding={3} display="flex" flexDirection="column" minHeight="400px">
          <Typography variant="h6" gutterBottom>
            Edit Number
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            display="flex"
            flexDirection="column"
            flexGrow={1}
            justifyContent="space-between"
          >
            <Box>
              <TextField
                {...register("number", { required: "Number is required" })}
                label="Number"
                fullWidth
                size="small"
                margin="normal"
                error={!!errors.number}
                helperText={errors.number?.message}
              />

              <TextField
                {...register("prefix")}
                label="Prefix"
                fullWidth
                size="small"
                margin="normal"
              />

              <TextField
                {...register("country")}
                label="Country"
                fullWidth
                size="small"
                margin="normal"
              />

              <TextField
                {...register("company")}
                label="Company"
                fullWidth
                size="small"
                margin="normal"
              />

              <TextField
                {...register("description")}
                label="Description"
                fullWidth
                size="small"
                margin="normal"
              />
            </Box>

            <Stack direction={"row"} spacing={2} justifyContent="flex-end" mt={2}>
              <SecondaryButton onClick={onClose} >
                Cancel
              </SecondaryButton>
              <PrimaryButton type="submit">
                Update Number
              </PrimaryButton>
            </Stack>
          </Box>
        </Box>
      </Dialog>

      <SnackbarHandler
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default EditNumberModal;

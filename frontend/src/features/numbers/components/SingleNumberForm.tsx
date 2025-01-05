import React from "react";
import { useForm } from "react-hook-form";
import { Box, TextField, Button } from "@mui/material";
import { useAddNumberMutation } from "../api";
import PrimaryButton from "../../../components/UI/PrimaryButton";

interface SingleNumberFormData {
  singleNumber: string;
}

interface SingleNumberFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export const SingleNumberForm: React.FC<SingleNumberFormProps> = ({
  onSuccess,
  onError,
}) => {
  const [addNumber] = useAddNumberMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SingleNumberFormData>();

  const onSubmitSingleNumber = async (data: SingleNumberFormData) => {
    try {
      await addNumber({ number: data.singleNumber }).unwrap();
      onSuccess(`Number "${data.singleNumber}" added successfully!`);
      reset();
    } catch (error: any) {
      onError(error?.data?.message || "Error adding number");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitSingleNumber)}
      sx={{
        backgroundColor: "white",
        padding: 4,
        borderRadius: 4,
        mt: 4,
        mb: 4,
      }}
    >
      <TextField
        fullWidth
        label="Single Number"
        variant="outlined"
        size="small"
        placeholder="e.g. 12345"
        {...register("singleNumber", {
          required: "Single number is required",
          pattern: {
            value: /^[0-9]+$/,
            message: "Invalid format: only digits allowed",
          },
        })}
        sx={{ mb: 4 }}
        error={Boolean(errors.singleNumber)}
        helperText={errors.singleNumber?.message}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <PrimaryButton
          type="submit"
          disabled={Boolean(errors.singleNumber)}
        >
          Add Number
        </PrimaryButton>
      </Box>
    </Box>
  );
};

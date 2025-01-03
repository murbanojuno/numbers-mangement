import React from "react";
import { useForm } from "react-hook-form";
import { Box, TextField, Button } from "@mui/material";
import { useAddNumberMutation } from "../../../api/numbersApi";

interface MultipleNumbersFormData {
  multipleNumbers: string;
}

interface MultipleNumbersFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export const MultipleNumbersForm: React.FC<MultipleNumbersFormProps> = ({
  onSuccess,
  onError,
}) => {
  const [addNumber] = useAddNumberMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MultipleNumbersFormData>();

  const onSubmitMultipleNumbers = async (data: MultipleNumbersFormData) => {
    const rawInput = data.multipleNumbers.trim();
    if (!rawInput) return;

    const splitNumbers = rawInput.split(",").map((n) => n.trim());
    let validCount = 0;
    const invalidNumbers: string[] = [];

    for (const num of splitNumbers) {
      if (!num) continue; // skip empty entries
      try {
        await addNumber({ number: num }).unwrap();
        validCount++;
      } catch (error) {
        invalidNumbers.push(num);
      }
    }

    // Handle success
    if (validCount > 0) {
      onSuccess(`${validCount} number(s) added successfully!`);
    }

    // Handle invalid
    if (invalidNumbers.length > 0) {
      onError(`Invalid: ${invalidNumbers.join(", ")}`);
    }

    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitMultipleNumbers)}
      sx={{
        backgroundColor: "white",
        padding: 4,
        borderRadius: 4,
        mt: 4,
        mb: 4,
      }}
    >
      <TextField
        label="Multiple Numbers"
        fullWidth
        multiline
        minRows={3}
        variant="outlined"
        size="small"
        placeholder="e.g. 12345,67890"
        {...register("multipleNumbers", {
          required: "Please enter at least one number",
          pattern: {
            value: /^[0-9,\s]+$/,
            message: "Only digits, commas, and spaces are allowed",
          },
        })}
        error={Boolean(errors.multipleNumbers)}
        helperText={errors.multipleNumbers?.message}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          disabled={Boolean(errors.multipleNumbers)}
          color="error"
          variant="contained"
          sx={{ mt: 4 }}
        >
          Add Numbers
        </Button>
      </Box>
    </Box>
  );
};

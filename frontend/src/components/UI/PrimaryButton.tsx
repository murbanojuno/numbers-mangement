import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { ButtonProps } from "@mui/material";

interface PrimaryButtonProps extends ButtonProps {
  children: string | React.ReactNode;
  isLoading?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  isLoading = false, // Default to false
  sx,
  ...props
}) => {
  return (
    <LoadingButton
      loading={isLoading}
      disableRipple
      color="secondary"
      variant="contained"
      sx={{
        textTransform: "none",
        ...sx, // Allow external styles to override defaults
      }}
      {...props}
    >
      {children}
    </LoadingButton>
  );
};

export default PrimaryButton;

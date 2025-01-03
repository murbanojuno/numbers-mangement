import React from "react";

import { Button, ButtonProps } from "@mui/material";

interface PrimaryButtonProps extends ButtonProps {
  children: string | React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      disableRipple
      color="secondary"
      variant="contained"
      sx={{
        textTransform: "none",
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;

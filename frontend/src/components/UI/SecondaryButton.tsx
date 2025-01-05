import React from "react";

import { Button, ButtonProps } from "@mui/material";

interface SecondaryButtonProps extends ButtonProps {
    children: string | React.ReactNode;
  }

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      disableRipple
      variant="outlined"
      sx={{
        textTransform: "none",
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;

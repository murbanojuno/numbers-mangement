import React from "react";

import { Button, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

interface LinkButtonProps {
  label: string;
  path: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ label, path }) => {
  const { palette } = useTheme();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <Button
      key={label}
      variant="text"
      disableRipple
      component={Link}
      to={path}
      sx={{
        position: "relative",
        pb: 1,
        textTransform: "none",
        backgroundColor: "transparent",
        color: palette.text.primary,
        fontWeight: isActive(path) ? "bold" : "normal",
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          bottom: 0,
          height: "2px",
          backgroundColor: palette.secondary.main,
          width: isActive(path) ? "100%" : "0%",
          transition: "width 0.3s ease-in-out",
        },
        "&:hover::after": {
          width: "100%",
        },
      }}
    >
      {label}
    </Button>
  );
};

export default LinkButton;

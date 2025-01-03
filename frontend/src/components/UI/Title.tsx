import { Box, Typography } from "@mui/material";
import React from "react";

interface TitleProps {
  title: string;
  subtitle?: string;
}
const Title = ({ title, subtitle }: TitleProps) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4">{title}</Typography>
      {subtitle && (
        <Typography variant="subtitle1" sx={{ fontWeight: 100 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default Title;

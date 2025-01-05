import { Box, Typography } from "@mui/material";
interface TitleProps {
  title: string;
  subtitle?: string;
  color?: string;
}
const Title = ({ title, subtitle, color }: TitleProps) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography color={color} variant="h4">{title}</Typography>
      {subtitle && (
        <Typography color={color} variant="subtitle1" sx={{ fontWeight: 100 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default Title;

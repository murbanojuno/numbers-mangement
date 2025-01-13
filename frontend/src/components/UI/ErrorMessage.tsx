import { Info } from "@mui/icons-material";
import { Box } from "@mui/material";
import Title from "./Title";

interface ErrorMessageProps {
  title?: string;
  subtitle?: string;
}

const ErrorMessage: React.FC = ({
  title = "Oops, something went wrong",
  subtitle = "Please try again later.",
}: ErrorMessageProps) => {
  return (
    <Box
      display="flex"
      gap={2}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "error.main",
        color: "white",
        padding: 4,
        borderRadius: 4,
        m: 4,
        textAlign: "center",
      }}
    >
      <Info fontSize="large" />
      <Title title={title} subtitle={subtitle} />
    </Box>
  );
};

export default ErrorMessage;

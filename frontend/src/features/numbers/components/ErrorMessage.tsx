import { Info } from "@mui/icons-material";
import { Box } from "@mui/material";
import Title from "../../../components/UI/Title";

const ErrorMessage: React.FC = () => {
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
        textAlign: "center", // Center-align text inside Title
      }}
    >
      <Info fontSize="large" />
      <Title
        title="Oops, something went wrong"
        subtitle="Please try again later."
      />
    </Box>
  );
};

export default ErrorMessage;

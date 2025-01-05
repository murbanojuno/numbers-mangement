import { Box, Button, Typography } from "@mui/material";
import { AddCircleOutline, PhoneDisabled } from "@mui/icons-material";
import { Link } from "react-router-dom";

const EmptyState: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      sx={{
        backgroundColor: "background.default",
        color: "text.secondary",
        textAlign: "center",
        padding: 4,
      }}
    >
      <PhoneDisabled sx={{ fontSize: 80, mb: 2, color: "text.disabled" }} />
      <Typography variant="h5" gutterBottom>
        No numbers found
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        It looks like you don't have any numbers added yet.
      </Typography>
    <Button
        startIcon={<AddCircleOutline />}
        component={Link}
        to='/register'
        variant="contained"
        color="secondary"
    >
        Add Numbers
    </Button>
    </Box>
  );
};

export default EmptyState;

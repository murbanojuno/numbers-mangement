import Box from "@mui/material/Box";
import heroImg from "../assets/hero_image.webp";
import Title from "../components/UI/Title";
import { Grid2 } from "@mui/material";

export default function HomePage(): JSX.Element {
  return (
    <Box textAlign="center" mt={10} sx={{ padding: { xs: 2, sm: 4, md: 6 } }}>
      <Title
        title="Effortlessly Manage Your Company Numbers"
        subtitle="Welcome to the Numbers Management Application"
      />
      <Grid2
        container
        justifyContent="center"
        alignItems="center"
        mt={4}
        spacing={2}
      >
        <Grid2>
          <Box
            component="img"
            src={heroImg}
            alt="Hero Image"
            sx={{
              width: "100%",
              maxWidth: "500px",
              height: "auto",
              marginTop: { xs: 2, sm: 4 },
              borderRadius: 2,
            }}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}

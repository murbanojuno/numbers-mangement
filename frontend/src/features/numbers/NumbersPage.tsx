import { useEffect, useState } from "react";
import { useGetNumbersQuery, useDeleteNumberMutation } from "./api";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Stack,
  Badge,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAltOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PrimaryButton from "../../components/UI/PrimaryButton";
import FilterModal from "./components/FilterModal";
import EditNumberModal from "./components/EditNumberModal";
import ConfirmationModal from "../../components/Modals/ConfirmationModal";
import Title from "../../components/UI/Title";
import ErrorMessage from "./components/ErrorMessage";
import EmptyState from "./components/EmptyState";
import { Number } from "./types";

export default function NumbersPage(): JSX.Element {
  const { data: numbers, isLoading, isError } = useGetNumbersQuery();
  
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [numberToEdit, setNumberToEdit] = useState<Number | undefined>();
  const [numberToRemove, setNumberToRemove] = useState<string | undefined>();
  const [deleteNumber] = useDeleteNumberMutation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    prefix: "",
    country: "",
    company: "",
  });
  const [filteredNumbers, setFilteredNumbers] = useState<Number[]>([]);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  useEffect(() => {
    if (numbers) {
      setFilteredNumbers(
        numbers.filter((num) => {
          const matchesSearch = num.number
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesPrefix =
            !filters.prefix || num.prefix === filters.prefix;
          const matchesCountry =
            !filters.country || num.country === filters.country;
          const matchesCompany =
            !filters.company || num.company === filters.company;

          return (
            matchesSearch && matchesPrefix && matchesCountry && matchesCompany
          );
        })
      );

      // Check if any filter is active
      setHasActiveFilters(
        !!filters.prefix || !!filters.country || !!filters.company
      );
    }
  }, [numbers, searchTerm, filters]);

  const handleRemove = async () => {
    if (numberToRemove) {
      await deleteNumber(numberToRemove);
      setOpenConfirmationModal(false);
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    setOpenConfirmationModal(true);
    setNumberToRemove(id);
  };

  const handleOpenEditModal = (id: string) => {
    const number = numbers?.find((num) => num.id === id);
    if (number) setNumberToEdit(number);
    setOpenEditModal(true);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }
  if (isError) return <ErrorMessage />;

  if (!numbers || numbers.length === 0) {
    return <EmptyState />;
  }

  return (
    <Box padding={4}>
      <Title
        title="Numbers Management Dashboard"
        subtitle="Easily view, edit, and manage your company's telephone numbers. Search, update, or delete entries to keep your database accurate and up-to-date."
      />

      <Stack direction="row" justifyContent="space-between" mb={2}>
        {/* Search Bar */}
        <TextField
          placeholder="Search by number"
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{ mr: 2 }}
        />
        <Badge
          color="primary"
          variant="dot"
          invisible={!hasActiveFilters}
          overlap="circular"
          sx={{
            "& .MuiBadge-dot": {
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              top: "10%",
              right: "-10%", // Adjust horizontal position
              transform: "translate(-50%, -50%)", // Center the badge
            },
          }}
        >
          <PrimaryButton
            onClick={() => setOpenFilterModal(true)}
            startIcon={<FilterAltIcon />}
          >
            Filter
          </PrimaryButton>
        </Badge>
      </Stack>
      {isMobile ? (
        // Mobile View: Display numbers content in cards
        <Stack spacing={2}>
          {filteredNumbers.map((num) => (
            <Card key={num.id} variant="outlined">
              <CardContent>
                <Typography variant="subtitle1">
                  <strong>ID:</strong> {num.id}
                </Typography>
                <Typography variant="body2">
                  <strong>Number:</strong> {num.number}
                </Typography>
                {num.prefix && (
                  <Typography variant="body2">
                    <strong>Prefix:</strong> {num.prefix}
                  </Typography>
                )}
                {num.country && (
                  <Typography variant="body2">
                    <strong>Country:</strong> {num.country}
                  </Typography>
                )}
                {num.company && (
                  <Typography variant="body2">
                    <strong>Company:</strong> {num.company}
                  </Typography>
                )}
                {num.description && (
                  <Typography variant="body2">
                    <strong>Description:</strong> {num.description}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <IconButton
                  color="primary"
                  onClick={() => handleOpenEditModal(num.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleOpenDeleteModal(num.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Stack>
      ) : (
        // Desktop View: Display numbers content in table
        <TableContainer component={Paper} sx={{ borderRadius: 3, mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Prefix</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredNumbers.map((num) => (
                <TableRow key={num.id}>
                  <TableCell>{num.id}</TableCell>
                  <TableCell>{num.number}</TableCell>
                  <TableCell>{num.prefix || "-"}</TableCell>
                  <TableCell>{num.country || "-"}</TableCell>
                  <TableCell>{num.company || "-"}</TableCell>
                  <TableCell>{num.description || "-"}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEditModal(num.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleOpenDeleteModal(num.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {openEditModal && (
        <EditNumberModal
          number={numberToEdit}
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
        />
      )}
      {openConfirmationModal && (
        <ConfirmationModal
          title={"Delete Number"}
          description="Are you sure you want to delete this number?"
          actionName="Delete Number"
          open={openConfirmationModal}
          onAction={handleRemove}
          onClose={() => setOpenConfirmationModal(false)}
        />
      )}
      {openFilterModal && (
        <FilterModal
          numbers={numbers || []}
          open={openFilterModal}
          filters={filters}
          setFilters={setFilters}
          onClose={() => setOpenFilterModal(false)}
        />
      )}
    </Box>
  );
}

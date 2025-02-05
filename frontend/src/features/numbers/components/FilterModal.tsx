import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import SecondaryButton from "../../../components/UI/SecondaryButton";
import PrimaryButton from "../../../components/UI/PrimaryButton";
import { Number } from "../types";
import { CloseOutlined } from "@mui/icons-material";

interface FilterModalProps {
  open: boolean;
  filters: { prefix: string; country: string; company: string };
  setFilters: (filters: {
    prefix: string;
    country: string;
    company: string;
  }) => void;
  onClose: () => void;
  numbers: Number[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  open,
  filters,
  setFilters,
  onClose,
  numbers,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  // Extract unique options for the selects
  const uniquePrefixes = Array.from(
    new Set(numbers.map((num) => num.prefix))
  ).filter(Boolean);
  const uniqueCountries = Array.from(
    new Set(numbers.map((num) => num.country))
  ).filter(Boolean);
  const uniqueCompanies = Array.from(
    new Set(numbers.map((num) => num.company))
  ).filter(Boolean);

  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({ prefix: "", country: "", company: "" });
    setFilters({ prefix: "", country: "", company: "" });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "500px",
          margin: { xs: 1, sm: 2 }, 
        },
      }}
    >
      <DialogTitle sx={{ mb: 0, pb: 0 }}>Filter Options</DialogTitle>
      <DialogContent sx={{ minWidth: "400px", padding: 2 }}>
        <Box display="flex" sx={{ mx: 2, mt: 2 }} flexDirection="column" gap={3}>
          {/* Prefix Filter */}
          <FormControl size="small">
            <InputLabel id="filter-by-prefix">Filter by Prefix</InputLabel>
            <Select
              labelId="filter-by-prefix"
              label="Filter by Prefix"
              value={localFilters.prefix}
              endAdornment={
                <IconButton size="small" sx={{ mr: 2 }} onClick={() =>  setLocalFilters({ ...localFilters, prefix: "" })}>
                  <CloseOutlined />
                </IconButton>
              }
              onChange={(e) =>
                setLocalFilters({ ...localFilters, prefix: e.target.value })
              }
            >
              {uniquePrefixes.map((prefix) => (
                <MenuItem key={prefix} value={prefix}>
                  {prefix}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Country Filter */}
          <FormControl size="small">
            <InputLabel id="filter-by-country">Filter by Country</InputLabel>
            <Select
              labelId="filter-by-country"
              label="Filter by Country"
              value={localFilters.country}
              endAdornment={
                <IconButton size="small" sx={{ mr: 2 }} onClick={() =>  setLocalFilters({ ...localFilters, country: "" })}>
                  <CloseOutlined />
                </IconButton>
              }
              onChange={(e) =>
                setLocalFilters({ ...localFilters, country: e.target.value })
              }
            >
              {uniqueCountries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Company Filter */}
          <FormControl size="small">
            <InputLabel id="filter-by-company">Filter by Company</InputLabel>
            <Select
              labelId="filter-by-company"
              label="Filter by Company"
              value={localFilters.company}
              endAdornment={
                <IconButton size="small" sx={{ mr: 2 }} onClick={() =>  setLocalFilters({ ...localFilters, company: "" })}>
                  <CloseOutlined />
                </IconButton>
              }
              onChange={(e) =>
                setLocalFilters({ ...localFilters, company: e.target.value })
              }
            >
              {uniqueCompanies.map((company) => (
                <MenuItem key={company} value={company}>
                  {company}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ m: 2 }}>
        <SecondaryButton onClick={handleReset}>Reset</SecondaryButton>
        <PrimaryButton onClick={handleApply}>Apply</PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};

export default FilterModal;

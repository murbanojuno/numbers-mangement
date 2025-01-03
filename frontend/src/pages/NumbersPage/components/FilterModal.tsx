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
  Button,
} from "@mui/material";
import { Number } from "../../../api/numbersApi";
import SecondaryButton from "../../../components/UI/SecondaryButton";
import PrimaryButton from "../../../components/UI/PrimaryButton";

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
    <Dialog open={open} onClose={onClose} sx={{ minWidth: "400px" }}>
      <DialogTitle sx={{ mb: 0, pb: 0}}>Filter Options</DialogTitle>
      <DialogContent sx={{ minWidth: "400px", padding: 2}}>
        <Box display="flex" sx={{ mt: 2}} flexDirection="column" gap={3}>
          {/* Prefix Filter */}
          <FormControl fullWidth size="small">
            <InputLabel id="filter-by-prefix">Filter by Prefix</InputLabel>
            <Select
              labelId="filter-by-prefix"
              label="Filter by Prefix"
              value={localFilters.prefix}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, prefix: e.target.value })
              }
            >
              <MenuItem value="">All</MenuItem>
              {uniquePrefixes.map((prefix) => (
                <MenuItem key={prefix} value={prefix}>
                  {prefix}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Country Filter */}
          <FormControl fullWidth size="small">
            <InputLabel id="filter-by-country">Filter by Country</InputLabel>
            <Select
              labelId="filter-by-country"
              label="Filter by Country"
              value={localFilters.country}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, country: e.target.value })
              }
            >
              <MenuItem value="">All</MenuItem>
              {uniqueCountries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Company Filter */}
          <FormControl fullWidth size="small">
            <InputLabel id="filter-by-company">Filter by Company</InputLabel>
            <Select
              labelId="filter-by-company"
              label="Filter by Company"
              value={localFilters.company}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, company: e.target.value })
              }
            >
              <MenuItem value="">All</MenuItem>
              {uniqueCompanies.map((company) => (
                <MenuItem key={company} value={company}>
                  {company}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <SecondaryButton onClick={handleReset}>
          Reset
        </SecondaryButton>
        <PrimaryButton onClick={handleApply}>
          Apply
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};

export default FilterModal;

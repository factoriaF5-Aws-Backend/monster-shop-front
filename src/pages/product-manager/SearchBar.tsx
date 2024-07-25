// src/components/SearchBar.tsx
import React from "react";
import { HStack, Input, IconButton } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  globalFilter: string;
  setGlobalFilter: (filterValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  globalFilter,
  setGlobalFilter,
}) => {
  return (
    <HStack spacing={2} mb={5}>
      <Input
        placeholder="Search products..."
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        bg="white"
        color="black"
        borderColor="brand.200"
      />
      <IconButton aria-label="Search products" icon={<FiSearch />} />
    </HStack>
  );
};

export default SearchBar;

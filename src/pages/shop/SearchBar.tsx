import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React from "react";

interface SearchBarProps {
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, handleSearch }) => {
  return (
    <InputGroup size="sm" maxW="300px">
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input
        placeholder="Search for products..."
        value={searchTerm}
        onChange={handleSearch}
        bg="white"
        color="black"
        borderRadius="md"
      />
    </InputGroup>
  );
};

export default SearchBar;

// src/components/ProductTable.tsx
import React, { useMemo } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  HStack,
  IconButton,
  Image,
  Switch,
} from "@chakra-ui/react";
import { useTable, useSortBy, Column } from "react-table";
import { FiChevronUp, FiChevronDown, FiEdit, FiTrash } from "react-icons/fi";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  featured: boolean;
};

interface ProductTableProps {
  products: Product[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  handleFeaturedChange: (id: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  handleEdit,
  handleDelete,
  handleFeaturedChange,
}) => {
  const columns: Column<Product>[] = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Image",
        accessor: "imageUrl",
        Cell: ({ value }) => (
          <Image src={value} boxSize="50px" objectFit="cover" />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Featured",
        accessor: "featured",
        Cell: ({ row }) => (
          <Switch
            isChecked={row.original.featured}
            onChange={() => handleFeaturedChange(row.original.id)}
          />
        ),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <HStack spacing={2}>
            <IconButton
              aria-label="Edit product"
              icon={<FiEdit />}
              onClick={() => handleEdit(row.original.id)}
            />
            <IconButton
              aria-label="Delete product"
              icon={<FiTrash />}
              onClick={() => handleDelete(row.original.id)}
            />
          </HStack>
        ),
      },
    ],
    [handleEdit, handleDelete, handleFeaturedChange]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: products }, useSortBy);

  return (
    <Box overflowX="auto">
      <Table {...getTableProps()} variant="simple" colorScheme="whiteAlpha">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                  color="white"
                >
                  <Flex align="center">
                    {column.render("Header")}
                    <span style={{ marginLeft: "8px" }}>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FiChevronDown />
                        ) : (
                          <FiChevronUp />
                        )
                      ) : (
                        <FiChevronUp visibility="hidden" />
                      )}
                    </span>
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={row.original.id}>
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    color="white"
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProductTable;

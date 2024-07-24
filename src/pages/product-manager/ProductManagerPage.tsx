// ManageProductsPage.tsx
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter, Column } from "react-table";
import {
  Box,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Flex,
  Tr,
  Th,
  Td,
  VStack,
  Heading,
  HStack,
  IconButton,
  Image,
  Switch,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiChevronUp,
  FiChevronDown,
  FiEdit,
  FiTrash,
} from "react-icons/fi";
import { ProductServices } from "../../services/product.services";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  featured: boolean;
};

const ProductManagerPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showFeatured, setShowFeatured] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchProducts = async () => {
    const data = await ProductServices.getAllProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (id: number) => {
    // Lógica para editar el producto
    console.log(`Edit product with id ${id}`);
  };

  const handleDelete = (id: number) => {
    setSelectedProductId(id);
    onOpen();
  };

  const confirmDelete = () => {
    if (selectedProductId !== null) {
      setProducts(
        products.filter((product) => product.id !== selectedProductId)
      );
      setSelectedProductId(null);
      onClose();
    }
  };

  const handleFeaturedChange = useCallback(
    (id: number) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? { ...product, featured: !product.featured }
            : product
        )
      );
    },
    [setProducts]
  );

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
    [handleFeaturedChange]
  );

  const data = useMemo(() => {
    return showFeatured
      ? products.filter((product) => product.featured)
      : products;
  }, [products, showFeatured]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter },
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <Box
      maxW="1200px"
      mx="auto"
      p={5}
      mt="20px"
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(10px)"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h2" size="xl" color="white" mb={5} textAlign="center">
        Manage Products
      </Heading>
      <VStack spacing={4} align="stretch">
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
        <FormControl display="flex" alignItems="center" mb={5}>
          <FormLabel htmlFor="show-featured" mb="0" color="white">
            Show Featured Only
          </FormLabel>
          <Switch
            id="show-featured"
            isChecked={showFeatured}
            onChange={() => setShowFeatured(!showFeatured)}
          />
        </FormControl>
        <Box overflowX="auto">
          <Table {...getTableProps()} variant="simple" colorScheme="whiteAlpha">
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      color="white"
                      //   display="flex"
                      alignItems="center"
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
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <Td {...cell.getCellProps()} color="white">
                        {cell.render("Cell")}
                      </Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </VStack>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={undefined}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ProductManagerPage;

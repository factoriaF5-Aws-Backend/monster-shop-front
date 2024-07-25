// src/pages/ManageProductsPage.tsx
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter, Column } from "react-table";
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Switch,
  useDisclosure,
  Image,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import ProductTable from "./ProductTable";
import DeleteDialog from "./DeleteDialog";
import SearchBar from "./SearchBar";
import { ProductServices } from "../../services/product.services";
import { FiEdit, FiTrash } from "react-icons/fi";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  featured: boolean;
};

const ManageProductsPage: React.FC = () => {
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

  const confirmDelete = async () => {
    if (selectedProductId !== null) {
      await ProductServices.deleteProduct(selectedProductId);
      setSelectedProductId(null);
      fetchProducts();
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
    setGlobalFilter,
    state: { globalFilter },
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

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
        <SearchBar
          globalFilter={globalFilter || ""}
          setGlobalFilter={setGlobalFilter}
        />
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
        <ProductTable
          products={data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleFeaturedChange={handleFeaturedChange}
        />
      </VStack>
      <DeleteDialog
        isOpen={isOpen}
        onClose={onClose}
        onDelete={confirmDelete}
      />
    </Box>
  );
};

export default ManageProductsPage;

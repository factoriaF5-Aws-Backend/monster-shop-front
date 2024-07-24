import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ProductGrid from "./ProductGrid";
import { ProductServices } from "../../services/product.services";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

const ShopPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const [products, setProducts] = useState<Product[]>([]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchProducts = async () => {
    const data = await ProductServices.getAllProducts();
    console.log(data);
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box maxW="1200px" mx="auto" p={5}>
      <Box mb={5} display="flex" justifyContent="flex-start">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      </Box>
      <ProductGrid products={filteredProducts} />
    </Box>
  );
};

export default ShopPage;

import { SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import ProductCard from "./ProductCard";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
};

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <Text>No products found.</Text>
      )}
    </SimpleGrid>
  );
};

export default ProductGrid;

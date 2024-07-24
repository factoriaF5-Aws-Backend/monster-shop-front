import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Box
      key={product.id}
      position="relative"
      height="400px"
      borderRadius="lg"
      overflow="hidden"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(10px)"
      border="1px solid rgba(255, 255, 255, 0.18)"
    >
      <Image
        src={product.imageUrl}
        alt={product.name}
        objectFit="cover"
        width="100%"
        height="100%"
      />
      <Box
        position="absolute"
        bottom="0"
        width="100%"
        bgGradient="linear(to-t, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6), transparent)"
        color="white"
        p={3}
        textAlign="center"
      >
        <Heading as="h3" size="sm" mb={1}>
          {product.name}
        </Heading>
        <Text fontSize="md" fontWeight="bold">
          ${product.price}
        </Text>
        <Button
          size="sm"
          colorScheme="teal"
          leftIcon={<AddIcon />}
          bg="brand.100"
          _hover={{ bg: "brand.200" }}
          _active={{ bg: "brand.300", transform: "scale(0.95)" }}
          borderRadius="full"
          boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
          mt={2}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;

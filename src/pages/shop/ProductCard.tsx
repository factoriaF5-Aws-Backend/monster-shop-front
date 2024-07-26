import React from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Generar las estrellas de valoración
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= product.rating) {
        stars.push(<Icon as={FaStar} color="yellow.400" key={i} />);
      } else if (
        i === Math.ceil(product.rating) &&
        !Number.isInteger(product.rating)
      ) {
        stars.push(<Icon as={FaStarHalfAlt} color="yellow.400" key={i} />);
      } else {
        stars.push(<Icon as={FaRegStar} color="yellow.400" key={i} />);
      }
    }
    return stars;
  };

  return (
    <Box
      key={product.id}
      position="relative"
      height="450px"
      borderRadius="lg"
      overflow="hidden"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(10px)"
      border="1px solid rgba(255, 255, 255, 0.18)"
    >
      {product.featured && (
        <Box
          position="absolute"
          top="10px"
          right="-20px"
          width="150px"
          height="40px"
          // bg="brand.200 0.2"
          color="white"
          borderRadius="0 0 10px 10px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontWeight="thin"
          textColor="white"
          backdropFilter="blur(10px)"
          boxShadow="0 0 20px rgba(0, 0, 0, 0.2)"
          transform="rotate(45deg)"
        >
          featured
        </Box>
      )}
      <ChakraLink as={ReactRouterLink} to={`/shop/products/${product.id}`}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </ChakraLink>
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
        <HStack justify="center" mb={1}>
          {renderStars()}
          <Text fontSize="sm" ml={2}>
            ({product.reviewCount})
          </Text>
        </HStack>
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

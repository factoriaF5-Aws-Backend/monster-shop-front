// ProductDetailPage.tsx
import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  Heading,
  Flex,
  HStack,
  IconButton,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddIcon, StarIcon } from "@chakra-ui/icons";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { ProductServices } from "../../services/product.services";
import { reviewsServices } from "../../services/reviews.services";

type Review = {
  username: string;
  rating: number;
  body: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  // reviews: Review[];
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  //   const product = products.find((p) => p.id === parseInt(id, 10));
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<Review>({
    username: "",
    rating: 0,
    body: "",
  });

  const fetchReviews = async () => {
    const data = await reviewsServices.getReviews(id);
    console.log(data);
    setReviews(data);
  };

  const fetchProduct = async () => {
    const data = await ProductServices.findById(parseInt(id || "0", 10));
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const handleAddReview = async () => {
    setReviews([...reviews, newReview]);
    await reviewsServices.addReview({ ...newReview, productId: id });
    fetchReviews();
    fetchProduct();
    setNewReview({ username: "", rating: 0, body: "" });
  };
  // TODO: Check if the user can review the product (Using auth user)
  const checkCanReview = reviews.every((r) => r.username !== "Sergi");

  return (
    <Box maxW="1200px" mx="auto" p={5} mt="20px" maxH="80vh">
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(10px)"
        borderRadius="lg"
        overflow="hidden"
        p={5}
        height="auto"
      >
        <Box width={{ base: "100%", md: "50%" }} maxH="80vh">
          <Image
            src={product.imageUrl}
            alt={product.name}
            objectFit="cover"
            width="100%"
            height="100%"
            borderRadius="lg"
            maxH="80vh"
          />
        </Box>
        <VStack
          align="flex-start"
          p={5}
          spacing={3}
          width={{ base: "100%", md: "50%" }}
          mt={{ base: 5, md: 0 }}
          maxH="80vh"
        >
          <Heading as="h2" size="xl" color="white">
            {product.name}
          </Heading>
          <HStack spacing={1}>
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                color={i < product.rating ? "teal.500" : "gray.300"}
              />
            ))}
            <Text fontSize="lg" color="white">
              {product.rating}
            </Text>
          </HStack>
          <Text fontSize="lg" color="white">
            {product.description}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="white">
            ${product.price}
          </Text>
          <Button
            size="md"
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
          <HStack spacing={4} mt={4}>
            <IconButton
              aria-label="Share on Facebook"
              icon={<FaFacebook />}
              colorScheme="facebook"
              variant="outline"
            />
            <IconButton
              aria-label="Share on Twitter"
              icon={<FaTwitter />}
              colorScheme="twitter"
              variant="outline"
            />
            <IconButton
              aria-label="Share on Instagram"
              icon={<FaInstagram />}
              colorScheme="pink"
              variant="outline"
            />
          </HStack>
        </VStack>
      </Flex>
      <Box
        mt={5}
        p={5}
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(10px)"
        borderRadius="lg"
      >
        <Heading as="h3" size="lg" color="white" mb={4}>
          Reviews
        </Heading>
        {reviews.map((review, index) => (
          <Box key={index} mb={4}>
            <HStack spacing={1}>
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < review.rating ? "teal.500" : "gray.300"}
                />
              ))}
              <Text fontWeight="bold" color="white">
                {review.username}
              </Text>
            </HStack>
            <Text color="white">{review.body}</Text>
            <Divider mt={2} mb={2} />
          </Box>
        ))}
        {checkCanReview && (
          <Box mt={5}>
            <Heading as="h4" size="md" color="white" mb={2}>
              Add a Review
            </Heading>

            <FormControl mb={3}>
              <FormControl mb={3}>
                <FormLabel color="white">Comment</FormLabel>
                <Textarea
                  placeholder="Your review"
                  value={newReview.body}
                  onChange={(e) =>
                    setNewReview({ ...newReview, body: e.target.value })
                  }
                  bg="white"
                  color="black"
                />
              </FormControl>
              <FormLabel color="white">Rating</FormLabel>
              <HStack>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < newReview.rating ? "teal.500" : "gray.300"}
                    cursor="pointer"
                    onClick={() =>
                      setNewReview({ ...newReview, rating: i + 1 })
                    }
                  />
                ))}
              </HStack>
            </FormControl>
            <Button onClick={handleAddReview} colorScheme="teal">
              Submit Review
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetailPage;

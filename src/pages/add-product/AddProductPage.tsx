// src/pages/AddProductPage.tsx
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { ProductServices } from "../../services/product.services";

type Product = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

const AddProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({ ...product, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    },
    [product]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageUpload,
    accept: "image/*",
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await ProductServices.uploadProduct(formData);
      console.log("Product uploaded successfully:", response);
      // Resetear el formulario
      setProduct({ name: "", description: "", price: 0, imageUrl: "" });
      setImageFile(null);
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      p={5}
      mt="20px"
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(10px)"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h2" size="xl" color="white" mb={5} textAlign="center">
        Add New Product
      </Heading>
      <VStack spacing={4} align="stretch">
        <FormControl id="name">
          <FormLabel color="white">Product Name</FormLabel>
          <Input
            name="name"
            value={product.name}
            onChange={handleChange}
            bg="white"
            color="black"
            borderColor="brand.200"
          />
        </FormControl>
        <FormControl id="description">
          <FormLabel color="white">Product Description</FormLabel>
          <Textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            bg="white"
            color="black"
            borderColor="brand.200"
          />
        </FormControl>
        <FormControl id="price">
          <FormLabel color="white">Price</FormLabel>
          <Input
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            bg="white"
            color="black"
            borderColor="brand.200"
          />
        </FormControl>
        <Box
          textAlign="center"
          {...getRootProps()}
          borderWidth="2px"
          borderRadius="lg"
          borderStyle="dashed"
          p={4}
          cursor="pointer"
          bg="rgba(255, 255, 255, 0.1)"
        >
          <input {...getInputProps()} />
          <Text color="white" mb={2}>
            Drag 'n' drop a product image here, or click to select one
          </Text>
          {product.imageUrl && <Avatar size="xl" src={product.imageUrl} />}
        </Box>
        <Button
          colorScheme="teal"
          onClick={handleSubmit}
          bg="brand.200"
          _hover={{ bg: "brand.300" }}
          _active={{ bg: "brand.400" }}
          alignSelf="center"
        >
          Add Product
        </Button>
      </VStack>
    </Box>
  );
};

export default AddProductPage;

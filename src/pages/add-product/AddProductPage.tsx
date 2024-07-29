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
  Image,
  Switch,
  useToast,
  FormErrorMessage,
  CloseButton,
  HStack,
} from "@chakra-ui/react";
import { ProductServices } from "../../services/product.services";

type Product = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  featured: boolean;
};

const AddProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    featured: false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
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
    multiple: false,
    accept: {
      "image/jpeg": [".jpeg", ".png", ".jpg", ".webp"],
    },
  });

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!product.name) newErrors.name = "Product name is required";
    if (!product.description)
      newErrors.description = "Product description is required";
    if (product.price <= 0) newErrors.price = "Price must be greater than zero";
    if (!product.imageUrl) newErrors.imageUrl = "Product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields correctly.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        render: ({ onClose }) => (
          <Box
            p={3}
            bg="rgba(255, 0, 0, 0.1)"
            borderRadius="md"
            backdropFilter="blur(10px)"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
            color="red.800"
            border="1px solid rgba(255, 0, 0, 0.3)"
            position="relative"
          >
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={onClose}
            />
            <Heading size="sm">Validation Error</Heading>
            <Text fontSize="sm">
              Please fill all required fields correctly.
            </Text>
          </Box>
        ),
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("featured", product.featured.toString());
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await ProductServices.uploadProduct(formData);
      console.log("Product uploaded successfully:", response);
      toast({
        title: "Product created.",
        description: "The product has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        render: ({ onClose }) => (
          <Box
            p={3}
            bg="rgba(0, 255, 0, 0.1)"
            borderRadius="md"
            backdropFilter="blur(10px)"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
            color="green.800"
            border="1px solid rgba(0, 255, 0, 0.3)"
            position="relative"
          >
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={onClose}
            />
            <Heading size="sm">Product created</Heading>
            <Text fontSize="sm">
              The product has been created successfully.
            </Text>
          </Box>
        ),
      });
      // Resetear el formulario
      setProduct({
        name: "",
        description: "",
        price: 0,
        imageUrl: "",
        featured: false,
      });
      setImageFile(null);
      setErrors({});
    } catch (error) {
      console.error("Error uploading product:", error);
      toast({
        title: "Error",
        description: "There was an error uploading the product.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        render: ({ onClose }) => (
          <Box
            p={3}
            bg="rgba(255, 0, 0, 0.1)"
            borderRadius="md"
            backdropFilter="blur(10px)"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
            color="red.800"
            border="1px solid rgba(255, 0, 0, 0.3)"
            position="relative"
          >
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={onClose}
            />
            <Heading size="sm">Error</Heading>
            <Text fontSize="sm">There was an error uploading the product.</Text>
          </Box>
        ),
      });
    }
  };

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
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(10px)"
        borderRadius="lg"
        overflow="hidden"
        p={5}
      >
        <Box textAlign="center" {...getRootProps()} cursor="pointer">
          <input {...getInputProps()} />
          <Image
            src={
              product.imageUrl ||
              "https://via.placeholder.com/400x300.png?text=Product+Image"
            }
            alt="Product"
            objectFit="cover"
            width={{ base: "100%", md: "50%" }}
            height={{ base: "400px", md: "auto" }}
            borderRadius="lg"
          />
          <Text color="white" mt={2}>
            Drag 'n' drop a product image here, or click to select one
          </Text>
        </Box>
        <VStack
          align="flex-start"
          p={5}
          spacing={3}
          width={{ base: "100%", md: "50%" }}
          mt={{ base: 5, md: 0 }}
        >
          <FormControl id="name" isInvalid={!!errors.name}>
            <FormLabel color="white">Product Name</FormLabel>
            <Input
              name="name"
              value={product.name}
              onChange={handleChange}
              bg="white"
              color="black"
              borderColor="brand.200"
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>
          <FormControl id="description" isInvalid={!!errors.description}>
            <FormLabel color="white">Product Description</FormLabel>
            <Textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              bg="white"
              color="black"
              borderColor="brand.200"
            />
            <FormErrorMessage>{errors.description}</FormErrorMessage>
          </FormControl>
          <FormControl id="price" isInvalid={!!errors.price}>
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
            <FormErrorMessage>{errors.price}</FormErrorMessage>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="featured" mb="0" color="white">
              Featured
            </FormLabel>
            <Switch
              id="featured"
              name="featured"
              isChecked={product.featured}
              onChange={handleChange}
              colorScheme="teal"
            />
          </FormControl>
          <Button
            colorScheme="teal"
            onClick={handleSubmit}
            bg="brand.200"
            _hover={{ bg: "brand.300" }}
            _active={{ bg: "brand.400" }}
            alignSelf="center"
            mt={4}
          >
            Add Product
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default AddProductPage;

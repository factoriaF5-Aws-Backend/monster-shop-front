import React, { useEffect, useState } from "react";
import { Box, Heading, Grid, GridItem } from "@chakra-ui/react";
import FullScreenCarousel from "./FullScreenCarousel";
import ProductCard from "../shop/ProductCard";
import { ProductServices } from "../../services/product.services";

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const fetchFeaturedProducts = async () => {
    const products = await ProductServices.findFeatured();
    console.log("Productos destacados:", products);
    setFeaturedProducts(products);
  };

  const images =
    featuredProducts &&
    featuredProducts.map((product) => ({
      id: product.id,
      src: product.imageUrl,
      title: product.name,
      price: product.price,
    }));

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <Box>
      {/* Carrusel de pantalla completa */}
      <FullScreenCarousel images={images} />

      {/* Sección de productos destacados */}
      <Box p={5} maxW="1200px" mx="auto">
        <Heading as="h3" size="lg" mb={4}>
          Featured Products
        </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
          {featuredProducts.map((product) => (
            <GridItem key={product.id}>
              <ProductCard product={product} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;

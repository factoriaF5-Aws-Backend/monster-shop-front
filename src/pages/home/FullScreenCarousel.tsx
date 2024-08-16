import React, { useEffect } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

const FullScreenCarousel: React.FC = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const length = images.length;
  console.log("Length: " + length);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevCurrent) =>
        prevCurrent === length - 1 ? 0 : prevCurrent + 1
      );
    }, 10000); // Cambia la imagen cada 10 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [length]); // Dependencia de length para asegurar que se recalcule si las imágenes cambian

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <Box position="relative" height="100vh" overflow="hidden">
      <AnimatePresence>
        {images.map(
          (slide, index) =>
            index === current && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                }}
              >
                <Box
                  position="relative"
                  width="60%"
                  height="100%"
                  overflow="hidden"
                >
                  <Box
                    width="100%"
                    height="100%"
                    bgImage={`url(${slide.src})`}
                    bgSize="cover"
                    bgPos="center"
                    style={{
                      //   WebkitMaskImage:
                      //     "radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)",
                      maskImage:
                        "linear-gradient(to right, black 50%, transparent 100%)",
                    }}
                  />
                </Box>
                <Box
                  position="relative"
                  width="40%"
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  color="white"
                  p={10}
                >
                  <Heading as="h1" size="2xl" mb={4}>
                    Happy Monstry
                  </Heading>
                  <Text fontSize="xl" mb={6}>
                    Discover our exclusive collection of high-quality products!
                  </Text>
                  <Button
                    as={ReactRouterLink}
                    to="/shop"
                    colorScheme="teal"
                    size="lg"
                    backgroundColor={"brand.200"}
                    _hover={{ backgroundColor: "brand.250" }}
                    color="white"
                  >
                    Shop Now
                  </Button>
                </Box>
              </motion.div>
            )
        )}
      </AnimatePresence>
    </Box>
  );
};

export default FullScreenCarousel;

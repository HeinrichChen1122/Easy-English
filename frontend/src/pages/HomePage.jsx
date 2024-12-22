import { Container, SimpleGrid, Text, VStack, Input, Box, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [video, setVideo] = useState("");
  const [debounceVal, setDebounceVal] = useState("");

  const debounceValue = useDebounce(video, 1000);

  useEffect(() => {
    setDebounceVal(video.replace("watch?v=", "embed/"));
  }, [debounceValue]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Box w={"65vw"} bg={useColorModeValue("white", "gray.800")} rounded={"lg"} shadow={"md"}>
          <Input
            placeholder="Enter Video"
            name="name"
            value={video}
            onChange={(e) => setVideo(e.target.value)} />
        </Box>
        <iframe
          width="1000vw"
          height="560.25vw"
          src={debounceVal || "https://www.youtube.com/embed/A_AJrtGtC3Y?si=7o7Q-Rr8CfNdoq9Z"}
        ></iframe>;
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 🚀
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

function useDebounce(cb, delay) {
  const [debounceValue, setDebounceValue] = useState(cb);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(cb);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [cb, delay]);
  return debounceValue;
}

export default HomePage

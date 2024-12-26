import { Container, SimpleGrid, Text, VStack, Input, Box, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import { useWordStore } from "../store/word";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const { fetchWords, words } = useWordStore();
  const [video, setVideo] = useState("");
  const [debounceVal, setDebounceVal] = useState("");

  const debounceValue = useDebounce(video, 1000);

  useEffect(() => {
    setDebounceVal(video.replace("watch?v=", "embed/"));
  }, [debounceValue]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

  useEffect(() => {
    let videoKey = video.split('watch?v=')[1]
    if (videoKey) {
      fetchWords(videoKey);
    }
  }, [fetchWords, debounceValue])

  return (
    <Container maxW='container.xl' pt={6} pb={12}>
      <VStack spacing={8}>
        <Box w={"65vw"} bg={useColorModeValue("white", "gray.800")} rounded={"lg"} shadow={"md"}>
          <Input
            placeholder="https://www.youtube.com/watch?v=A_AJrtGtC3Y"
            name="name"
            value={video}
            onChange={(e) => setVideo(e.target.value)} />
        </Box>
        <iframe
          width="1000vw"
          height="560.25vw"
          src={debounceVal || "https://www.youtube.com/embed/A_AJrtGtC3Y?si=7o7Q-Rr8CfNdoq9Z"}
        ></iframe>;

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
            😢{" "}
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

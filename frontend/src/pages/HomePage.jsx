import { Container, SimpleGrid, Text, VStack, Input, Box, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useWordStore } from "../store/word";
import WordCard from "../components/WordCard";

const HomePage = () => {
  const { fetchWords, words } = useWordStore();
  const [video, setVideo] = useState("");
  const [debounceVal, setDebounceVal] = useState("");

  const debounceValue = useDebounce(video, 1000);

  useEffect(() => {
    setDebounceVal(video.replace("watch?v=", "embed/"));
  }, [debounceValue]);

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
          src={isValidUrl(debounceVal) ? debounceVal : "https://www.youtube.com/embed/A_AJrtGtC3Y?si=7o7Q-Rr8CfNdoq9Z"}
        ></iframe>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {words && words[0] && <WordCard key={words[0].word} word={words[0]} />}
          {words && words[1] && <WordCard key={words[1].word} word={words[1]} />}
          {words && words[2] && <WordCard key={words[2].word} word={words[2]} />}
        </SimpleGrid>

        {words.length === 0 && (
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

function isValidUrl(urlString) {
  var urlPattern = new RegExp('^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$', 'i');
  return !!urlPattern.test(urlString);
}

export default HomePage

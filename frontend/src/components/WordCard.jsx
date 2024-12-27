import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, IconButton, Image, useColorModeValue, useToast } from "@chakra-ui/react";
import { useWordStore } from "../store/word";
import { useState } from "react";

const WordCard = ({ word }) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteWord } = useWordStore();
    const toast = useToast();

    const handleDeleteWord = async () => {
        console.log(word)
        const { success, message } = await deleteWord(word.word);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={word.image} h={48} w='full' objectFit='cover' />

            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {word.word}
                </Heading>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} colorScheme='blue' />
                    <IconButton
                        icon={<DeleteIcon />}
                        onClick={handleDeleteWord}
                        colorScheme='red'
                    />
                </HStack>
            </Box>
        </Box>
    );
};
export default WordCard;
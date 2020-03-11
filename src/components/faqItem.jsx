import React, { useState } from "react";
import { IconButton, Collapse, Box, Heading, Flex } from "@chakra-ui/core";

export const FAQItem = ({ question, answer }) => {
  const [show, setShow] = useState(true);
  return (
    <Box
      backgroundColor='gray.50'
      p={4}
      borderRadius='md'
      mb={4}
      onClick={() => setShow(!show)}
      cursor='pointer'>
      <Flex justify='space-between' alignItems='center'>
        <Heading as='h4' fontSize='xl'>
          {question}
        </Heading>
        <IconButton
          variant='ghost'
          icon={show === true ? "chevron-up" : "chevron-down"}
        />
      </Flex>
      <Collapse mt={4} isOpen={show}>
        {answer}
      </Collapse>
    </Box>
  );
};

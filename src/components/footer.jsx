import React from "react";
import { Button, Flex, DarkMode } from "@chakra-ui/core";
import { Link } from "gatsby";

const Footer = () => {
  return (
    <Flex
      p={4}
      isInline
      justify='center'
      backgroundColor='gray.900'
      borderRadius='md'
      position='absolute'
      left={[4, 4, 8, 12]}
      right={[4, 4, 8, 12]}
      bottom={4}
      w='auto'>
      <Link to='/faq/'>
        <DarkMode>
          <Button variant='ghost'>FAQ</Button>
        </DarkMode>
      </Link>
    
      <Link to='/contact/'>
        <DarkMode>
          <Button variant='ghost'>Contact</Button>
        </DarkMode>
      </Link>
    </Flex>
  );
};

export default Footer;

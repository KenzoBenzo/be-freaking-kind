import React from "react";
import { Button, Icon, Flex, DarkMode } from "@chakra-ui/core";
import { Link } from "gatsby";

const Navigation = () => {
  return (
    <Flex
      py={4}
      px={[4, 4, 4, 8]}
      isInline
      justifyContent='space-between'
      backgroundColor='gray.900'
      borderRadius='md'
      mb={6}>
      <Link to='/'>
        <Icon name='Logo' color='white' h={10} w='auto' />
      </Link>

      <DarkMode>
        <Link to='/cart/'>
          <Button
            leftIcon='bag'
            variantColor='blue'
            variant='ghost'
            mx='auto'
            fontWeight='medium'>
            Cart
          </Button>
        </Link>
      </DarkMode>
    </Flex>
  );
};

export default Navigation;

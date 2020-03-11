import React from "react";
import {
  Button,
  Icon,
  Flex,
  DarkMode,
  Badge,
  DrawerFooter,
  Drawer,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  useDisclosure,
  Divider,
  Heading,
  LightMode,
  Text,
  Stat,
  StatLabel,
  StatNumber
} from "@chakra-ui/core";
import { Link } from "gatsby";
import { useCart } from "react-use-cart";
import CartItem from "./cartItem";

const Navigation = () => {
  const { totalItems, items, cartTotal, emptyCart, isEmpty } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const formattedSubTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(cartTotal / 100);
  return (
    <>
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
          <Button
            leftIcon='bag'
            variantColor='blue'
            variant='ghost'
            fontWeight='medium'
            ref={btnRef}
            onClick={onOpen}>
            Cart
            <Badge variantColor='blue' ml={2} fontSize='0.8'>
              {totalItems > 0 ? totalItems : null}
            </Badge>
          </Button>
        </DarkMode>
      </Flex>
      <DarkMode>
        <Drawer
          isOpen={isOpen}
          placement='right'
          finalFocusRef={btnRef}
          onClose={onClose}
          backgroundColor='gray.900'
          overflow='scroll'
          size='md'
          zIndex='2'>
          <DrawerHeader
            backgroundColor='gray.900'
            color='white'
            pos='sticky'
            top='0'
            zIndex='2'
            display='flex'>
            <DrawerCloseButton onClick={onClose} pos='absolute' />
            <Heading as='h2' fontSize='2xl' mr={4}>
              Cart
            </Heading>
            <Badge variantColor='teal' fontSize='xl'>
              {totalItems > 0 ? totalItems : "0"}
            </Badge>
            <Text ml={2}>item{totalItems === 1 ? null : "s"}</Text>
            <Divider borderColor='gray.800' />
          </DrawerHeader>

          <DrawerBody backgroundColor='gray.900'>
            <Stack spacing={4}>{items.map(CartItem)}</Stack>
          </DrawerBody>

          <DrawerFooter
            backgroundColor='gray.900'
            pos='sticky'
            bottom='0'
            w='100%'>
            <Stack>
              <Stat p={0} color='white' textAlign='right'>
                <StatLabel>Subtotal</StatLabel>
                <StatNumber>{isEmpty ? "-" : formattedSubTotal}</StatNumber>
              </Stat>
              <Divider color='gray.800' />
              <Stack isInline mt={4}>
                <Button
                  variant='outline'
                  mr={3}
                  onClick={async () => emptyCart()}
                  isDisabled={isEmpty}>
                  Clear cart
                </Button>
                <LightMode>
                  <Link to='/checkout' onClick={onClose}>
                    <Button
                      variantColor='red'
                      fontWeight='600'
                      isDisabled={isEmpty}>
                      Checkout
                    </Button>
                  </Link>
                </LightMode>
              </Stack>
            </Stack>
          </DrawerFooter>
        </Drawer>
      </DarkMode>
    </>
  );
};

export default Navigation;

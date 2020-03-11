import React from "react";
import { useCart } from "react-use-cart";
import Img from "gatsby-image";
import { IconButton, Heading, Text, Stack, Box } from "@chakra-ui/core";

function CartItem({ id, name, quantity, price, image }) {
  const { updateItemQuantity, removeItem } = useCart();

  const increment = () => updateItemQuantity(id, quantity + 1);
  const decrement = () => updateItemQuantity(id, quantity - 1);
  const remove = () => removeItem(id);

  const total = quantity * price;

  const formattedUnitPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(price / 100);

  const formattedLineTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(total / 100);

  return (
    <Stack
      key={id}
      backgroundColor='gray.800'
      p={4}
      borderRadius='md'
      isInline
      align='center'
      justify='space-between'>
      <Img
        fluid={image.childImageSharp.fluid}
        alt={name}
        title={name}
        style={{ height: 64, width: 64, borderRadius: 4 }}
      />
      <Box ml={4}>
        <Heading as='h4' color='white' fontSize='sm' mb={2}>
          {name}
        </Heading>
        {quantity > 1 ? (
          <Text color='white' fontSize='sm'>
            {formattedUnitPrice} /each
          </Text>
        ) : (
          <Text color='white' fontSize='sm'>
            {formattedLineTotal}
          </Text>
        )}
        <Text onClick={remove} color='red.200' fontSize='sm' cursor='pointer'>
          Remove
        </Text>
      </Box>
      <Stack spacing={2} justify='center' textAlign='center'>
        <IconButton
          icon='chevron-up'
          size='xs'
          variant='ghost'
          onClick={increment}
        />
        <Text color='white' fontSize='sm'>
          {quantity}
        </Text>
        <IconButton
          icon='chevron-down'
          size='xs'
          variant='ghost'
          onClick={decrement}
          isDisabled={quantity <= 1 ? true : false}
        />
      </Stack>
    </Stack>
  );
}

export default CartItem;

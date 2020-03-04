import React from "react";
import { useCart } from "react-use-cart";
import Img from "gatsby-image";
import {
  Button,
  IconButton,
  Flex,
  Text,
  Stack,
  DarkMode
} from "@chakra-ui/core";

function CartItem({ id, name, quantity, price, image }) {
  const { updateItemQuantity, removeItem } = useCart();

  const increment = () => updateItemQuantity(id, quantity + 1);
  const decrement = () => updateItemQuantity(id, quantity - 1);
  const remove = () => removeItem(id);

  const total = quantity * price;

  const formattedUnitPrice = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
  }).format(price / 100);

  const formattedLineTotal = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
  }).format(total / 100);

  return (
    <Flex
      key={id}
      justifyContent='space-between'
      align='center'
      backgroundColor='gray.900'
      p={4}
      borderRadius='md'
      mb={4}>
      <div>
        <Img
          fluid={image.childImageSharp.fluid}
          alt={name}
          title={name}
          style={{ height: 80, borderRadius: 4, marginBottom: 16 }}
        />
        <Text color='white'>{name}</Text>
      </div>

      <Stack isInline align='center' spacing={4}>
        <IconButton icon='add' size='sm' variant='ghost' onClick={increment} />
        <Text color='white'>{quantity}</Text>
        <IconButton
          icon='minus'
          size='sm'
          variant='ghost'
          onClick={decrement}
        />
      </Stack>

      <div>
        <Text color='white'>{formattedLineTotal}</Text>
        {quantity > 1 && <Text color='white'>{formattedUnitPrice} each</Text>}
      </div>

      <Button
        rightIcon='small-close'
        variantColor='red'
        variant='ghost'
        onClick={remove}>
        Remove
      </Button>
    </Flex>
  );
}

export default CartItem;

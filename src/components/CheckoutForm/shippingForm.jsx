import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
import CheckoutContext from "../../context/checkout";
import {
  Input,
  Select,
  Button,
  Heading,
  Stack,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Checkbox
} from "@chakra-ui/core";
import usePrintfulShippingCountries from "../../hooks/usePrintfulShippingCountries";

function ShippingForm() {
  const { errors, register, watch } = useFormContext();
  const { shippingCountries } = usePrintfulShippingCountries();
  const { allowPayment, processing: checkoutProcessing } = useContext(
    CheckoutContext
  );

  const { shipping: { country: shippingCountryCode } = {} } = watch({
    nest: true
  });

  const activeShippingCountry = shippingCountries.find(
    country => country.code === shippingCountryCode
  );

  const disableInput = allowPayment || checkoutProcessing;

  return (
    <Stack spacing={4} mb={4}>
      <Heading as='h3'>Shipping</Heading>

      <FormControl>
        <FormLabel htmlFor='shippingName'>Name</FormLabel>
        <Input
          name='shipping.name'
          size='sm'
          isDisabled={disableInput}
          ref={register({ required: "Shipping name is required" })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <Stack isInline spacing={4}>
        <FormControl w='100%'>
          <FormLabel htmlFor='email'>Email address</FormLabel>
          <Input
            name='email'
            size='sm'
            type='email'
            isDisabled={disableInput}
            ref={register({
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email is invalid"
              }
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl w='100%'>
          <FormLabel htmlFor='phoneNumber'>Contact Number</FormLabel>
          <Input
            name='phone'
            size='sm'
            type='tel'
            isDisabled={disableInput}
            register={register}
          />
        </FormControl>
      </Stack>

      <FormControl>
        <FormLabel htmlFor='address1'>Address</FormLabel>
        <Input
          name='shipping.address1'
          size='sm'
          isDisabled={disableInput}
          ref={register({
            required: "Shipping address line 1 is required"
          })}
        />
        <FormErrorMessage>
          {errors.address1 && errors.address1.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor='address2'>
          Apartment, suite, etc. (optional)
        </FormLabel>
        <Input
          name='shipping.address2'
          size='sm'
          isDisabled={disableInput}
          ref={register}
        />
      </FormControl>

      <Stack isInline spacing={4}>
        <FormControl w='100%'>
          <FormLabel htmlFor='city'>City</FormLabel>
          <Input
            name='shipping.city'
            size='sm'
            isDisabled={disableInput}
            ref={register({ required: "Shipping city is required" })}
          />
          <FormErrorMessage>
            {errors.city && errors.city.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor='zipcode'>Zipcode</FormLabel>
          <Input
            name='shipping.zip'
            size='sm'
            isDisabled={disableInput}
            ref={register({ required: "Shipping ZIP is required" })}
          />
          <FormErrorMessage>
            {errors.zip && errors.zip.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>

      <Stack isInline spacing={4}>
        <FormControl>
          <FormLabel htmlFor='country'>Country</FormLabel>
          <Select
            name='shipping.country'
            size='sm'
            isDisabled={disableInput}
            ref={register({ required: "Shipping country is required" })}>
            {shippingCountries.map(({ code: value, name }) => {
              return (
                <option key={value} value={value}>
                  {name}
                </option>
              );
            })}
          </Select>
          <FormErrorMessage>
            {errors.country && errors.country.message}
          </FormErrorMessage>
        </FormControl>

        {activeShippingCountry && activeShippingCountry.states && (
          <FormControl w='100%'>
            <FormLabel htmlFor='state'>State</FormLabel>
            <Select
              name='shipping.state'
              size='sm'
              isDisabled={disableInput}
              ref={register({ required: "Shipping state is required" })}>
              {activeShippingCountry.states.map(({ code: value, name }) => {
                return (
                  <option key={value} value={value}>
                    {name}
                  </option>
                );
              })}
            </Select>
            <FormErrorMessage>
              {errors.state && errors.state.message}
            </FormErrorMessage>
          </FormControl>
        )}
      </Stack>

      {!allowPayment && (
        <Stack
          direction={["column", "column", "column", "row"]}
          justify='space-between'
          spacing={4}>
          <Button
            type='submit'
            size='sm'
            isLoading={checkoutProcessing}
            loadingText='Calculating'
            isDisabled={disableInput}>
            Calculate shipping
          </Button>
          <FormLabel display='flex' alignItems='center'>
            <Checkbox
              name='separateBilling'
              isDisabled={disableInput}
              ref={register}
              w={6}
              _focus={{ borderColor: "none" }}
            />
            Use different billing address
          </FormLabel>
        </Stack>
      )}
    </Stack>
  );
}

export default ShippingForm;

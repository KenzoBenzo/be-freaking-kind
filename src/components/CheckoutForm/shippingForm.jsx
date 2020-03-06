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
  FormErrorMessage
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
    <Stack spacing={4}>
      <Heading as='h3'>Shipping</Heading>
      <FormControl>
        <FormLabel htmlFor='shippingName'>Name</FormLabel>
        <Input
          name='shipping.name'
          isDisabled={disableInput}
          ref={register({ required: "Shipping name is required" })}
        />
        {/* <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage> */}
      </FormControl>

      <FormControl>
        <FormLabel htmlFor='email'>Email address</FormLabel>
        <Input
          name='email'
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

      <FormControl>
        <Input
          name='phone'
          type='tel'
          placeholder='Contact no.'
          isDisabled={disableInput}
          register={register}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor='address1'>Address</FormLabel>
        <Input
          name='shipping.address1'
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
          isDisabled={disableInput}
          ref={register}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor='city'>City</FormLabel>
        <Input
          name='shipping.city'
          isDisabled={disableInput}
          ref={register({ required: "Shipping city is required" })}
        />
        <FormErrorMessage>
          {errors.city && errors.city.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor='country'>Country</FormLabel>
        <Select
          name='shipping.country'
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
        <FormControl>
          <FormLabel htmlFor='state'>State</FormLabel>
          <Select
            name='shipping.state'
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

      <FormControl>
        <FormLabel htmlFor='zipcode'>ZIP / Postcode</FormLabel>
        <Input
          name='shipping.zip'
          isDisabled={disableInput}
          ref={register({ required: "Shipping ZIP is required" })}
        />
        <FormErrorMessage>{errors.zip && errors.zip.message}</FormErrorMessage>
      </FormControl>

      {!allowPayment && (
        <Stack isInline justify='space-between'>
          <FormLabel display='flex' alignItems='center'>
            <Input
              name='separateBilling'
              type='checkbox'
              isDisabled={disableInput}
              ref={register}
              w={6}
              _focus={{ borderColor: "none" }}
            />
            Use different billing address
          </FormLabel>
          <Button
            type='submit'
            isLoading={checkoutProcessing}
            isDisabled={disableInput}>
            Calculate shipping
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

export default ShippingForm;

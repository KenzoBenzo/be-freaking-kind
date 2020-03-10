import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
import {
  Input,
  Select,
  Heading,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Stack
} from "@chakra-ui/core";
import CheckoutContext from "../../context/checkout";

import usePrintfulShippingCountries from "../../hooks/usePrintfulShippingCountries";

function BillingForm() {
  const { errors, register, watch } = useFormContext();
  const { shippingCountries } = usePrintfulShippingCountries();
  const { allowPayment, processing: checkoutProcessing } = useContext(
    CheckoutContext
  );

  const { billing: { country: billingCountryCode } = {} } = watch({
    nest: true
  });

  const activeBillingCountry = shippingCountries.find(
    country => country.code === billingCountryCode
  );

  const disableInput = allowPayment || checkoutProcessing;

  return (
    <Stack spacing={4}>
      <Heading as='h3'>Billing</Heading>

      <FormControl>
        <FormLabel htmlFor='billingName'>Name</FormLabel>
        <Input
          name='billing.name'
          size='sm'
          isDisabled={disableInput}
          ref={register({ required: "Billing name is required" })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor='address1'>Address</FormLabel>
        <Input
          name='billing.address1'
          size='sm'
          isDisabled={disableInput}
          ref={register({
            required: "Billing address line 1 is required"
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
          name='billing.address2'
          size='sm'
          isDisabled={disableInput}
          ref={register}
        />
      </FormControl>

      <Stack isInline spacing={4}>
        <FormControl w='100%'>
          <FormLabel htmlFor='city'>City</FormLabel>
          <Input
            name='billing.city'
            size='sm'
            isDisabled={disableInput}
            ref={register({ required: "Billing city is required" })}
          />
          <FormErrorMessage>
            {errors.city && errors.city.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor='zipcode'>ZIP / Postcode</FormLabel>
          <Input
            name='billing.zip'
            size='sm'
            isDisabled={disableInput}
            ref={register({ required: "Billing ZIP is required" })}
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
            name='billing.country'
            size='sm'
            isDisabled={disableInput}
            ref={register({ required: "Billing country is required" })}>
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

        {activeBillingCountry && activeBillingCountry.states && (
          <FormControl w='100%'>
            <FormLabel htmlFor='state'>State</FormLabel>
            <Select
              name='billing.state'
              size='sm'
              isDisabled={disableInput}
              ref={register({ required: "Billing state is required" })}>
              {activeBillingCountry.states.map(({ code: value, name }) => {
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
    </Stack>
  );
}

export default BillingForm;

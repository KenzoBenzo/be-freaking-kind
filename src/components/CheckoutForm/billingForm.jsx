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
          isDisabled={disableInput}
          ref={register}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor='city'>City</FormLabel>
        <Input
          name='billing.city'
          isDisabled={disableInput}
          ref={register({ required: "Billing city is required" })}
        />
        <FormErrorMessage>
          {errors.city && errors.city.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor='country'>Country</FormLabel>
        <Select
          name='billing.country'
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
        <FormControl>
          <FormLabel htmlFor='state'>State</FormLabel>
          <Select
            name='billing.state'
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

      <FormControl>
        <FormLabel htmlFor='zipcode'>ZIP / Postcode</FormLabel>
        <Input
          name='billing.zip'
          isDisabled={disableInput}
          ref={register({ required: "Billing ZIP is required" })}
        />
        <FormErrorMessage>{errors.zip && errors.zip.message}</FormErrorMessage>
      </FormControl>
    </Stack>
  );
}

export default BillingForm;

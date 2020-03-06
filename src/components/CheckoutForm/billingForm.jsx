import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { Input, Select, Heading } from "@chakra-ui/core";
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
    <div>
      <Heading as="h3">Billing</Heading>

      <div>
        <Input
          name="name"
          placeholder="Name"
          isDisabled={disableInput}
          register={register({ required: "Billing name is required" })}
          errors={errors}
        />
      </div>

      <div>
        <Input
          name="address1"
          placeholder="Address line 1"
          isDisabled={disableInput}
          register={register({
            required: "Billing address line 1 is required"
          })}
          errors={errors}
        />
      </div>

      <div>
        <Input
          name="address2"
          placeholder="Apartment, suite, etc. (optional)"
          isDisabled={disableInput}
          register={register}
          errors={errors}
        />
      </div>

      <div>
        <div>
          <Input
            name="city"
            placeholder="City"
            isDisabled={disableInput}
            register={register({ required: "Billing city is required" })}
            errors={errors}
          />
        </div>
        <div>
          <Select
            name="country"
            isDisabled={disableInput}
            register={register({ required: "Billing country is required" })}
            options={shippingCountries.map(({ code: value, name }) => ({
              value,
              name
            }))}
            errors={errors}
          />
        </div>
      </div>

      <div>
        {activeBillingCountry && activeBillingCountry.states && (
          <div>
            <Select
              name="state"
              isDisabled={disableInput}
              register={register({ required: "Billing state is required" })}
              options={activeBillingCountry.states.map(
                ({ code: value, name }) => ({
                  value,
                  name
                })
              )}
              errors={errors}
            />
          </div>
        )}

        <div>
          <Input
            name="zip"
            placeholder="ZIP / Postcode"
            isDisabled={disableInput}
            register={register({ required: "Billing ZIP is required" })}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}

export default BillingForm;

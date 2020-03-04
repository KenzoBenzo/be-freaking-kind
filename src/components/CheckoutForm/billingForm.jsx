import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { Input, Select } from "@chakra-ui/core";
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
      <h3>Billing</h3>

      <div>
        <Input
          name='billing.name'
          placeholder='Name'
          disabled={disableInput}
          register={register({ required: "Billing name is required" })}
          errors={errors}
        />
      </div>

      <div>
        <Input
          name='billing.address1'
          placeholder='Address line 1'
          disabled={disableInput}
          register={register({
            required: "Billing address line 1 is required"
          })}
          errors={errors}
        />
      </div>

      <div>
        <Input
          name='billing.address2'
          placeholder='Apartment, suite, etc. (optional)'
          disabled={disableInput}
          register={register}
          errors={errors}
        />
      </div>

      <div>
        <div>
          <Input
            name='billing.city'
            placeholder='City'
            disabled={disableInput}
            register={register({ required: "Billing city is required" })}
            errors={errors}
          />
        </div>
        <div>
          <Select
            name='billing.country'
            disabled={disableInput}
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
              name='billing.state'
              disabled={disableInput}
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
            name='billing.zip'
            placeholder='ZIP / Postcode'
            disabled={disableInput}
            register={register({ required: "Billing ZIP is required" })}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}

export default BillingForm;

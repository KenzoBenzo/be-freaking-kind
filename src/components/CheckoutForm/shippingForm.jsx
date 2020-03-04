import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
// import LoadingSVG from "../../svg/loading.svg";
import CheckoutContext from "../../context/checkout";
import { Input, Checkbox, Select } from "@chakra-ui/core";
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
    <div>
      <h3>Shipping</h3>

      <div>
        <Input
          name='shipping.name'
          placeholder='Name'
          disabled={disableInput}
          register={register({ required: "Shipping name is required" })}
          errors={errors}
        />
      </div>

      <div>
        <div>
          <Input
            name='email'
            type='email'
            placeholder='Email address'
            disabled={disableInput}
            register={register({
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email is invalid"
              }
            })}
            errors={errors}
          />
        </div>

        <div>
          <Input
            name='phone'
            type='tel'
            placeholder='Contact no.'
            disabled={disableInput}
            register={register}
            errors={errors}
          />
        </div>
      </div>

      <div>
        <Input
          name='shipping.address1'
          placeholder='Address line 1'
          disabled={disableInput}
          register={register({
            required: "Shipping address line 1 is required"
          })}
          errors={errors}
        />
      </div>

      <div>
        <Input
          name='shipping.address2'
          placeholder='Apartment, suite, etc. (optional)'
          disabled={disableInput}
          register={register}
          errors={errors}
        />
      </div>

      <div>
        <div>
          <Input
            name='shipping.city'
            placeholder='City'
            disabled={disableInput}
            register={register({ required: "Shipping city is required" })}
            errors={errors}
          />
        </div>

        <div>
          <Select
            name='shipping.country'
            disabled={disableInput}
            register={register({ required: "Shipping country is required" })}
            options={shippingCountries.map(({ code: value, name }) => ({
              value,
              name
            }))}
            errors={errors}
          />
        </div>
      </div>

      <div>
        {activeShippingCountry && activeShippingCountry.states && (
          <div>
            <Select
              name='shipping.state'
              disabled={disableInput}
              register={register({ required: "Shipping state is required" })}
              options={activeShippingCountry.states.map(
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
            name='shipping.zip'
            placeholder='ZIP / Postcode'
            disabled={disableInput}
            register={register({ required: "Shipping ZIP is required" })}
            errors={errors}
          />
        </div>
      </div>

      {!allowPayment && (
        <div>
          <Checkbox
            name='separateBilling'
            disabled={disableInput}
            register={register}>
            Use different billing address
          </Checkbox>
          <button type='submit' disabled={disableInput}>
            {/* {checkoutProcessing ? <LoadingSVG /> : "Calculate shipping"} */}
          </button>
        </div>
      )}
    </div>
  );
}

export default ShippingForm;

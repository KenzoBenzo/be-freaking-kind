import React, { useContext, useEffect } from "react";
import { useFormContext, ErrorMessage } from "react-hook-form";
import { CardElement } from "@stripe/react-stripe-js";
import CheckoutContext from "../../context/checkout";
import PaymentInfo from "./paymentInfo";
import { Heading, Button, Text } from "@chakra-ui/core";

function PaymentForm() {
  const { errors, register, setValue } = useFormContext();
  const {
    allowPayment,
    error: checkoutError,
    processing: checkoutProcessing,
    success: checkoutSuccess
  } = useContext(CheckoutContext);

  useEffect(() => {
    if (allowPayment)
      register(
        { name: "stripe" },
        { required: "Please provide payment details" }
      );
  }, [allowPayment, register]);

  const handleStripeChange = e => setValue("stripe", e);

  return (
    <div>
      <div>
        <Heading as="h3" mt={6}>
          Pay
        </Heading>
        {!allowPayment && (
          <p>You must calculate shipping totals before proceeding to payment</p>
        )}
      </div>
      {allowPayment && (
        <React.Fragment>
          <PaymentInfo />

          <div>
            <CardElement
              options={{ hidePostalCode: true }}
              disabled={checkoutProcessing}
              onChange={handleStripeChange}
              onReady={el => setValue("cardElement", el)}
            />

            {errors.stripe && (
              <React.Fragment>
                <ErrorMessage as={<p />} name="stripe" errors={errors} />
              </React.Fragment>
            )}
          </div>

          {checkoutError && <Text color="red.500">{checkoutError}</Text>}
          {checkoutProcessing && "Please wait. Processing order."}
          {checkoutSuccess && "Order successfully received."}
          <div>
            <Button
              type="submit"
              isLoading={checkoutProcessing}
              isDisabled={checkoutProcessing}
            >
              Pay for order
            </Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default PaymentForm;

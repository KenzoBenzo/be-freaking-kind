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
        <Heading as='h3' mt={6}>
          Pay
        </Heading>
        {!allowPayment && (
          <Text>
            You must calculate shipping totals before proceeding to payment
          </Text>
        )}
      </div>
      {allowPayment && (
        <React.Fragment>
          <PaymentInfo />

          <div>
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    backgroundColor: "white",
                    border: "1px solid gray.200",
                    borderColor: "gray.200",
                    borderRadius: "md",
                    padding: "4px",
                    paddingRight: "16px",
                    width: "100%",
                    "::placeholder": {
                      borderColor: "teal.500"
                    }
                  },
                  invalid: {
                    color: "#9e2146"
                  }
                }
              }}
              disabled={checkoutProcessing}
              onChange={handleStripeChange}
              onReady={el => setValue("cardElement", el)}
            />

            {errors.stripe && (
              <>
                <ErrorMessage as={<p />} name='stripe' errors={errors} />
              </>
            )}
          </div>

          {checkoutError && <Text color='red.500'>{checkoutError}</Text>}
          {checkoutProcessing && "Please wait. Processing order."}
          {checkoutSuccess && "Order successfully received."}
          <div>
            <Button
              type='submit'
              variantColor='red'
              isLoading={checkoutProcessing}
              isDisabled={checkoutProcessing}>
              Pay for order
            </Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default PaymentForm;

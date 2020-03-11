import React, { useContext, useEffect } from "react";
import { useFormContext, ErrorMessage } from "react-hook-form";
import { CardElement } from "@stripe/react-stripe-js";
import CheckoutContext from "../../context/checkout";
import PaymentInfo from "./paymentInfo";
import { Heading, Button, Text, Box, Stack } from "@chakra-ui/core";

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
    <Stack>
      <Heading as='h3' mt={6}>
        Pay
      </Heading>
      {!allowPayment && (
        <Text>
          You must calculate shipping totals before proceeding to payment
        </Text>
      )}
      {allowPayment && (
        <React.Fragment>
          <PaymentInfo />

          <Box
            my={4}
            border='1px solid'
            borderColor='gray.200'
            borderRadius='md'
            py='11px'
            px='8px'
            w='100%'>
            <CardElement
              options={{ hidePostalCode: true }}
              disabled={checkoutProcessing}
              onChange={handleStripeChange}
              onReady={el => setValue("cardElement", el)}
            />

            {errors.stripe && (
              <>
                <ErrorMessage as={<p />} name='stripe' errors={errors} />
              </>
            )}
          </Box>

          {checkoutError && <Text color='red.500'>{checkoutError}</Text>}
          {checkoutProcessing && <Text>Please wait. Processing order.</Text>}
          {checkoutSuccess && <Text>Order successfully received.</Text>}
          <div>
            <Button
              type='submit'
              variantColor='red'
              isLoading={checkoutProcessing}
              loadingText='Paying'
              isDisabled={checkoutProcessing}>
              Pay for order
            </Button>
          </div>
        </React.Fragment>
      )}
    </Stack>
  );
}

export default PaymentForm;

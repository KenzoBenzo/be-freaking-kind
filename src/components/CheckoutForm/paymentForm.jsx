import React, { useContext, useEffect } from "react";
import { useFormContext, ErrorMessage } from "react-hook-form";
import { CardElement } from "@stripe/react-stripe-js";
// import LoadingSVG from "../../svg/loading.svg";
import CheckoutContext from "../../context/checkout";
import PaymentInfo from "./paymentInfo";

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
        <h3>Pay</h3>
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
                <ErrorMessage as={<p />} name='stripe' errors={errors} />
              </React.Fragment>
            )}
          </div>

          {checkoutError && <p>{checkoutError}</p>}
          {checkoutProcessing && "Please wait. Processing order."}
          {checkoutSuccess && "Order successfully received."}
          <div>
            <button type='submit' disabled={checkoutProcessing}>
              {/* {checkoutProcessing ? <LoadingSVG /> : "Pay for order"} */}
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default PaymentForm;

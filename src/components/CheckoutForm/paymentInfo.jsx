import React from "react";

function PaymentInfo() {
  return (
    <div>
      <p>
        This is a <strong>test checkout</strong>. You can simulate transactions
        using any valid expiry date, CVC code and{" "}
        <code>4242 4242 4242 4242</code>, or <code>4000 0000 0000 3220</code> if
        you want trigger 3D Secure 2 authentication.
      </p>
    </div>
  );
}

export default PaymentInfo;

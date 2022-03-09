# React Yoco
React hooks and components for accepting payments in your React application with [Yoco Gateway](https://www.yoco.com/za/yoco-gateway/).

![Yoco payments banner](https://ps.w.org/yoco-payment-gateway/assets/banner-1544x500.png?rev=2683672)

## Installation

```
yarn add @yoco/yoco-react
```
## Getting Started

The [Yoco Popup](https://developer.yoco.com/online/popup/popup) offers you the quickest and easiest way to accept online card payments.

You can use the `usePopup` hook to show the pop up payment form in your React application.

The hook returns a `showPopup` method you can call to trigger the pop up. It also returns variable `isYocoReady` that you can use to determine whether or not the Yoco SDK has loaded and is ready for the pop up to be displayed.

The hook itself expects two parameters:
- Your Yoco public key. Learn more [about that here](https://developer.yoco.com/online/resources/integration-keys).
- The payment ID for the checkout. You will have initiated the payment with a server-to-server call on the backend. Learn more about payment initiation [from the official documentation](https://deploy-preview-38--modest-shannon-b4f7f0.netlify.app/blackbird/sdk/accept-payments#2-initiate-a-payment).

🛠️ Use [the Postman collection](./docs/YocoBlackbirdv1.0.0.postman_collection.json) to quickly create test payments.

The `showPopup` method expects a `callback`. This callback will receive the `YocoCheckoutResult` after the pop up has completed processing the user's payment.
It will require also require an `onClose` method to handle when the user dimisses the pop up.
Then finally a `currency` and `amountInCents`.

Here's an example implementation:

```tsx
import React, { FC }  from 'react';
import { usePopup } from '@yoco/yoco-react';

const PopupExample: FC = () => {
  const [showPopup, isYocoReady] = usePopup('your_public_key', 'a_valid_payment_id');

  async function callback(result: YocoCheckoutResult) {
    if (result.error) {
      // handle failure
      // result.error.message - Error message
      // result.error.status  - Error status
      return;
    }
    // result.id has the payment's id for verification
  }

  async function onClose() {
    // handle pop up dismissal
  }

  async function onSubmit() {
    showPopup({ amountInCents: 1000, callback, currency: 'ZAR', onClose });
  }

  return (
    <button disabled={!isYocoReady} onClick={onSubmit}>Pay</button>
  );
}
```

You can view the full list of configuration options for the showPopup method in the [usePopupHook reference](./docs/usePopupHook.md).

### Verifying successful payments

The `YocoCheckoutResult` has an `id` that you can use for verifying a payment with a server-to-server call.
Learn how to use the API in the [official guide](https://deploy-preview-38--modest-shannon-b4f7f0.netlify.app/blackbird/sdk/save-card-during-payment#6-optional-verify-the-payment-succeeded).

The [Postman collection](./docs/YocoBlackbirdv1.0.0.postman_collection.json) has a payment verification helper.

## useYoco hook

If all you need is the base Yoco SDK without the hooks and components, the library exposes a `useYoco` hook.

You can then use the SDK as normal according to the official docs. It is the same hook used internally by the rest of the hooks in this library.

The hook expects your Yoco public key, and optionally a payment ID depending on your use case.
# Support

If you have any questions, feedback or you are experiencing issues integrating, please contact developers@yoco.com.


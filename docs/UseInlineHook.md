# useInlineHook 

```tsx
import { useInline } from '@yoco/yoco-react';
```

Refer to the general documentation for the [inline checkout experience here](https://deploy-preview-38--modest-shannon-b4f7f0.netlify.app/online/inline/inline).

## Initialising the hook

```tsx
const [inline, isValid, validationErrorMessage] = useInline(
    publicKey: string,
    {
        YocoCustomer?:      YocoCustomer;
        layout:             'plain' | 'basic' | 'field';
        showErrors?:        boolean;
        showSubmitButton?:  boolean;
        submitButtonText?:  string;
    }
);
```

You can use `isValid` and `validationErrorMessage` to display error messages in the case when you would have set `showErrors` to false.

The optional `YocoCustomer` has structure:

```tsx
type YocoCustomer = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
};
```

## Mounting the inline SDK

```
inline.mount("#card-frame");
```

## Submitting a payment
The `submit` method accepts an object according to this type definition:

```tsx
type YocoSDKInlineSubmission = {
  id: string;
  YocoCustomer?: string;
  paymentMethodDetails?: {
    save: boolean;
    usable: 'offline' | 'online';
  };
};
```
The method itself is a thenable promise, and you may async/await on the result.

The full `YocoCheckoutResult` type definition is:

```tsx
interface YocoCheckoutResult {
  id?: string;
  error?: {
    data: {
      message: string;
      status: number;
    };
    message: string;
  };
  paymentMethod: string | undefined;
  source: {
    card: {
      expiryMonth: number;
      expiryYear: number;
      maskedCard: string;
      scheme: string;
      usable: string;
    };
  };
  status: string;
}
```

The `stories` directory contains additional example usage you may reference.

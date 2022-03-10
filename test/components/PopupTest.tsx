import React, { FC, HTMLAttributes } from 'react';
import { usePopup } from '../../src/hooks/usePopup';
import { YocoCheckoutResult, Currency } from '../../src/types';

interface Props extends HTMLAttributes<HTMLFormElement> {
  amountInCents: number;
  currency: Currency;
  publicKey: string;
  paymentId: string;
}

export const PopupTest: FC<Props> = ({
  amountInCents,
  currency,
  publicKey,
  paymentId,
}) => {
  const [showPopup, isYocoReady] = usePopup(publicKey, paymentId);

  async function callback(res: YocoCheckoutResult) {
    alert('callback!');
    console.log({ res });
  }

  async function onClose() {
    alert('"onClose" callback invoked.');
  }

  async function onSubmit() {
    showPopup({
      amountInCents,
      currency,
      callback,
      onClose,
    });
  }

  return (
    <button disabled={!isYocoReady} onClick={onSubmit}>
      Pay
    </button>
  );
};

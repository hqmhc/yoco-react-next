import React, { FC, HTMLAttributes } from 'react';
import { usePopup } from '../../src/hooks/usePopup';
import { YocoCheckoutResult } from '../../src/types';

interface Props extends HTMLAttributes<HTMLFormElement> {
  publicKey: string;
  paymentId: string;
}

export const PopupTest: FC<Props> = ({ publicKey, paymentId }) => {
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

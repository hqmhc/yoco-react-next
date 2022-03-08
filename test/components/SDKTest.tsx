import React, { FC, HTMLAttributes } from 'react';
import { useYoco } from '../../src/hooks/useYoco';
import { YocoCheckoutResult } from '../../src/types';

interface Props extends HTMLAttributes<HTMLFormElement> {
  publicKey: string;
  paymentId: string;
}

export const SDKTest: FC<Props> = ({ publicKey, paymentId }) => {
  const yocoSDK = useYoco(publicKey, paymentId);

  async function callback(res: YocoCheckoutResult) {
    alert('callback!');
    console.log({ res });
  }

  async function onClose() {
    alert('"onClose" callback invoked.');
  }

  async function onSubmit() {
    if (!yocoSDK) {
      return;
    }
    yocoSDK.showPopup({
      callback,
      onClose,
    });
  }

  return <button onClick={onSubmit}>Pay</button>;
};

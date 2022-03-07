import React, { FC, HTMLAttributes } from 'react';
import { useBlackbirdSDK } from '../hooks/useBlackbirdSDK';
import { YocoSDKResult } from '../../src/types';

interface Props extends HTMLAttributes<HTMLFormElement> {
  publicKey: string;
  paymentId: string;
}

export const BlackbirdTest: FC<Props> = ({ publicKey, paymentId }) => {
  const blackbirdSDK = useBlackbirdSDK(publicKey, paymentId);

  async function callback(res: YocoSDKResult) {
    alert('callback!');
    console.log({ res });
  }

  async function onClose() {
    alert('"onClose" callback invoked.');
  }

  async function onSubmit() {
    if (!blackbirdSDK) {
      return;
    }
    blackbirdSDK.showPopup({
      callback,
      onClose,
    });
  }

  return <button onClick={onSubmit}>Pay</button>;
};

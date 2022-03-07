import React, { FC, HTMLAttributes } from 'react';
import { usePopupSDK } from '../../src/hooks/usePopupSDK';
import { YocoSDKResult } from '../../src/types';

interface Props extends HTMLAttributes<HTMLFormElement> {
  publicKey: string;
  paymentId: string;
}

export const PopupTest: FC<Props> = ({ publicKey, paymentId }) => {
  const [showPopup, isSDKReady] = usePopupSDK(publicKey, paymentId);

  async function callback(res: YocoSDKResult) {
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
    <button disabled={!isSDKReady} onClick={onSubmit}>
      Pay
    </button>
  );
};

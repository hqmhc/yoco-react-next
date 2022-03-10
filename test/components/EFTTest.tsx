import React, { FC, HTMLAttributes } from 'react';
import { useEFT } from '../../src/hooks/useEFT';

interface Props extends HTMLAttributes<HTMLFormElement> {
  publicKey: string;
  paymentId: string;
}

export const EFTTest: FC<Props> = ({ publicKey, paymentId }) => {
  const [showEFT, isYocoReady] = useEFT(publicKey);

  async function onSubmit() {
    showEFT({ id: paymentId });
  }

  return (
    <button disabled={!isYocoReady} onClick={onSubmit}>
      Pay
    </button>
  );
};

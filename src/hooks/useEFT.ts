import { useEffect, useState } from 'react';
import { useYoco } from './useYoco';

import { YocoCheckoutResult, YocoEFTPopupConfig } from '../types';

export const useEFT = (publicKey: string) => {
  const yocoSDK = useYoco(publicKey);
  const [isYocoReady, setisYocoReady] = useState<boolean>(false);

  function showEFT(params: YocoEFTPopupConfig): Promise<YocoCheckoutResult> {
    if (!yocoSDK) {
      throw new Error('YocoSDK not ready.');
    }
    return yocoSDK.submit({
      ...params,
      paymentType: 'EFT',
    });
  }

  useEffect(() => {
    if (!yocoSDK) {
      setisYocoReady(false);
    }
    setisYocoReady(true);
  }, [yocoSDK]);

  return [showEFT, isYocoReady] as const;
};

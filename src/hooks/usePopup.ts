import { useEffect, useState } from 'react';
import { useYoco } from './useYoco';

import { YocoPopupConfig } from '../types';

export const usePopup = (publicKey: string, paymentId: string) => {
  const yocoSDK = useYoco(publicKey, paymentId);
  const [isYocoReady, setisYocoReady] = useState<boolean>(false);

  function showPopup(params: YocoPopupConfig) {
    yocoSDK?.showPopup(params);
  }

  useEffect(() => {
    if (!yocoSDK) {
      setisYocoReady(false);
    }
    setisYocoReady(true);
  }, [yocoSDK]);

  return [showPopup, isYocoReady] as const;
};

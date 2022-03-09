import { useEffect, useState } from 'react';

import { YocoSDK } from '../types';

const addScript = (onLoad: () => void) => {
  const script = document.createElement('script');
  script.src = 'https://js.yoco.com/sdk/v1/yoco-sdk-web.js';
  script.async = true;
  script.onload = onLoad;
  document.head.appendChild(script);
};

export const useYocoLegacy = (publicKey: string, id?: string) => {
  const [yocoSDK, setYocoSDK] = useState<YocoSDK>();
  const initSdk = () => {
    setYocoSDK(
      new (window as any).YocoSDK({
        publicKey,
        id,
      })
    );
  };

  useEffect(() => {
    if (!(window as any).YocoSDK) {
      addScript(() => initSdk());
    } else {
      initSdk();
    }
  }, []);
  return yocoSDK;
};

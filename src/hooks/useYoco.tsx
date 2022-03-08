import { useEffect, useState } from 'react';

import { YocoSDK } from '../types';

const addScript = (onLoad: () => void) => {
  const script = document.createElement('script');
  script.src =
    'https://blackbird-web-sdk.netlify.app/sdk/v1/blackbird-web-sdk.js';
  script.async = true;
  script.onload = onLoad;
  document.head.appendChild(script);
};

export const useYoco = (publicKey: string, id?: string) => {
  const [yocoSDK, setYocoSDK] = useState<YocoSDK>();
  const initSdk = () => {
    setYocoSDK(
      new (window as any).yocoSDK({
        publicKey,
        id,
      })
    );
  };

  useEffect(() => {
    if (!(window as any).yocoSDK) {
      addScript(() => initSdk());
    } else {
      initSdk();
    }
  }, []);
  return yocoSDK;
};

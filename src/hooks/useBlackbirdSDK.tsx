import { useEffect, useState } from 'react';

import { BlackbirdSDK } from '../types';

const addScript = (onLoad: () => void) => {
  const script = document.createElement('script');
  script.src = 'https://blackbird-web-sdk.netlify.app/sdk/v1/blackbird-web-sdk.js';
  script.async = true;
  script.onload = onLoad;
  document.head.appendChild(script);
};

export const useBlackbirdSDK = (publicKey: string, id?: string) => {
  const [blackbirdSDK, setBlackbirdSDK] = useState<BlackbirdSDK>();
  const initSdk = () => {
    setBlackbirdSDK(
      new (window as any).BlackbirdSDK({
        publicKey,
        id
      })
    );
  };

  useEffect(() => {
    if (!(window as any).BlackbirdSDK) {
      addScript(() => initSdk());
    } else {
      initSdk();
    }
  }, []);
  return blackbirdSDK;
};

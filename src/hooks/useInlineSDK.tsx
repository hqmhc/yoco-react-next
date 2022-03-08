import { useEffect, useState } from 'react';
import { useBlackbirdSDK } from './useBlackbirdSDK';

import { YocoSDKInlineInstance, YocoInlineConfig } from '../types';

export const useInlineSDK = (publicKey: string, config: YocoInlineConfig) => {
  const blackbirdSDK = useBlackbirdSDK(publicKey);
  const [inlineSDK, setInlineSDK] = useState<YocoSDKInlineInstance>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [validationErrorMessage, setValidationErrorMessage] =
    useState<string>('');

  useEffect(() => {
    if (!blackbirdSDK) {
      return;
    }
    setInlineSDK(blackbirdSDK.inline(config));
  }, [blackbirdSDK]);

  useEffect(() => {
    if (!inlineSDK) {
      return;
    }

    inlineSDK.on((window as any).BlackbirdSDK.Events.VALIDITY_CHANGE, () => {
      setIsValid(inlineSDK.isValid());
      setValidationErrorMessage(inlineSDK.validationErrorMessage());
    });
  }, [inlineSDK]);

  return [inlineSDK, isValid, validationErrorMessage] as const;
};

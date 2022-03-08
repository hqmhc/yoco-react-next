import { useEffect, useState } from 'react';
import { useYoco } from './useYoco';

import { YocoSDKInlineInstance, YocoInlineConfig } from '../types';

export const useInline = (publicKey: string, config: YocoInlineConfig) => {
  const yocoSDK = useYoco(publicKey);
  const [inline, setInline] = useState<YocoSDKInlineInstance>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [validationErrorMessage, setValidationErrorMessage] =
    useState<string>('');

  useEffect(() => {
    if (!yocoSDK) {
      return;
    }
    setInline(yocoSDK.inline(config));
  }, [yocoSDK]);

  useEffect(() => {
    if (!inline) {
      return;
    }

    inline.on((window as any).yocoSDK.Events.VALIDITY_CHANGE, () => {
      setIsValid(inline.isValid());
      setValidationErrorMessage(inline.validationErrorMessage());
    });
  }, [inline]);

  return [inline, isValid, validationErrorMessage] as const;
};

import { useEffect, useState } from 'react';
import { useBlackbirdSDK } from './useBlackbirdSDK';

import { YocoPopupConfig } from '../types';

export const usePopupSDK = (
    publicKey: string,
    paymentId: string
) => {
    const blackbirdSDK = useBlackbirdSDK(publicKey, paymentId);
    const [isSDKReady, setIsSDKReady] = useState<boolean>(false);

    function showPopup(params: YocoPopupConfig) {
        blackbirdSDK?.showPopup(params);
    }

    useEffect(() => {
        if (!blackbirdSDK) {
            setIsSDKReady(false);
        }
        setIsSDKReady(true);
    }, [blackbirdSDK]);
    
    return [showPopup, isSDKReady] as const;
};

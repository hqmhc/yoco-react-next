import { YocoPopupConfig } from '../types';
export declare const usePopup: (publicKey: string, paymentId: string) => readonly [(params: YocoPopupConfig) => void, boolean];

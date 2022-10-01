import { YocoCheckoutResult, YocoEFTPopupConfig } from '../types';
export declare const useEFT: (publicKey: string) => readonly [(params: YocoEFTPopupConfig) => Promise<YocoCheckoutResult>, boolean];

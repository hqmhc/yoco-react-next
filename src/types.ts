export type Currency = 'ZAR' | 'MUR';

export type YocoCustomer = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
};

export type YocoInlineLayout = 'plain' | 'basic' | 'field';

export interface YocoInlineConfig {
  amountInCents: number;
  currency: Currency;
  layout: YocoInlineLayout;
  showErrors?: boolean;
  showSubmitButton?: boolean;
  submitButtonText?: string;
  YocoCustomer?: YocoCustomer;
}

type YocoSDKInlineSubmission = {
  id: string;
  YocoCustomer?: string;
  paymentMethodDetails?: {
    save: boolean;
    usable: 'offline' | 'online';
  };
};

export interface YocoSDKInlineInstance {
  mount: (element: string) => void;
  on: (event: string, callback: () => void) => void;
  submit: (submission: YocoSDKInlineSubmission) => Promise<YocoCheckoutResult>;
  createToken: () => Promise<YocoCheckoutResult>;
  isValid: () => boolean;
  validationErrorMessage: () => string;
}

export interface YocoPopupConfig {
  id?: string;
  callback: (result: YocoCheckoutResult) => void;
  onClose?: () => void;
  amountInCents: number;
  currency: Currency;
  YocoCustomer?: string;
  'YocoCustomer.email'?: string;
  'YocoCustomer.phone'?: string;
  'YocoCustomer.firstName'?: string;
  'YocoCustomer.lastName'?: string;
  description?: string;
  image?: string;
  metadata?: object;
  name?: string;
  paymentMethod?: string;
  paymentType?: 'CARD';
}

export interface YocoEFTPopupConfig {
  id: string;
  paymentType?: 'EFT';
}

export interface YocoCheckoutResult {
  id?: string;
  error?: {
    message: string;
    status: number;
  };
  paymentMethod: string | undefined;
  source: {
    card: {
      expiryMonth: number;
      expiryYear: number;
      maskedCard: string;
      scheme: string;
      usable: string;
    };
  };
  status: string;
}

export interface YocoSDK {
  inline: (config: YocoInlineConfig) => YocoSDKInlineInstance;
  showPopup: (config: YocoPopupConfig) => void;
  submit: (config: YocoEFTPopupConfig) => Promise<YocoCheckoutResult>;
}

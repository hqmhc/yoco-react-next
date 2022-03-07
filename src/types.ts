export type Currency = 'ZAR' | 'MUR';

export type Customer = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
};

export type YocoInlineLayout = 'plain' | 'basic' | 'field';

export interface YocoInlineConfig {
  customer?: Customer;
  layout: YocoInlineLayout;
  showErrors?: boolean;
  showSubmitButton?: boolean;
  submitButtonText?: string;
}

type YocoSDKInlineSubmission = {
  id: string;
  customer?: string;
  paymentMethodDetails?: {
    save: boolean;
    usable: 'offline' | 'online';
  };
};

export interface YocoSDKInlineInstance {
  mount: (element: string) => void;
  on: (event: string, callback: () => void) => void;
  submit: (submission: YocoSDKInlineSubmission) => Promise<YocoSDKResult>;
  isValid: () => boolean;
  validationErrorMessage: () => string;
}

export interface YocoPopupConfig {
  id?: string;
  callback: (result: YocoSDKResult) => void;
  onClose?: () => void;
  amountInCents?: number;
  currency?: Currency;
  customer?: string;
  'customer.email'?: string;
  'customer.phone'?: string;
  'customer.firstName'?: string;
  'customer.lastName'?: string;
  description?: string;
  image?: string;
  metadata?: object;
  name?: string;
  paymentMethod?: string;
  paymentType?: 'CARD';
}

export interface YocoSDKResult {
  id?: string;
  error?: {
    data: {
      message: string;
      status: number;
    };
    message: string;
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

export interface BlackbirdSDK {
  inline: (config: YocoInlineConfig) => YocoSDKInlineInstance;
  showPopup: (config: YocoPopupConfig) => void;
}

export type InlineSDkValidity = {
  isValid: boolean;
  validationErrorMessage: string | null;
};

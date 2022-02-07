import React, { FC, HTMLAttributes }  from 'react';
import { Meta, Story } from '@storybook/react';

import { YocoSDKResult } from '../src/types';
import { usePopupSDK } from '../src/hooks/usePopupSDK';

interface Props extends HTMLAttributes<HTMLFormElement> {
  publicKey: string;
  paymentId: string;
}

const Popup: FC<Props> = ({publicKey, paymentId}) => {
  const [showPopup, isSDKReady] = usePopupSDK(publicKey, paymentId);

  async function callback(res: YocoSDKResult) {
    alert('callback!');
    console.log({res});
  }

  async function onClose() {
    alert('"onClose" callback invoked.');
  }

  async function onSubmit() {
    showPopup({
      callback,
      onClose
    });
  }

  return (
    <button disabled={!isSDKReady} onClick={onSubmit}>Pay</button>
  );
}

const meta: Meta = {
  title: 'usePopupSDK',
  component: Popup,
  argTypes: {
    publicKey: {
      description: 'Yoco merchant public key.',
      control: {
        type: 'text',
      },
    },
    paymentId: {
      description: 'Yoco merchant secret key.',
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = args => <Popup {...args} />;

export const Default = Template.bind({});

Default.args = {
  publicKey: 'pk_test_68b64fa8qRzN52Xe2234',
  paymentId: 'p_pLpJGWOoJ2BflwVf61cdk0gZ'
};

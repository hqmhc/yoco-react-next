import React, { FC, HTMLAttributes }  from 'react';
import { Meta, Story } from '@storybook/react';

import { YocoCheckoutResult } from '../src/types';
import { usePopup } from '../src/hooks/usePopup';

interface Props extends HTMLAttributes<HTMLFormElement> {
  publicKey: string;
  paymentId: string;
}

const Popup: FC<Props> = ({publicKey, paymentId}) => {
  const [showPopup, isYocoReady] = usePopup(publicKey, paymentId);

  async function callback(res: YocoCheckoutResult) {
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
    <button disabled={!isYocoReady} onClick={onSubmit}>Pay</button>
  );
}

const meta: Meta = {
  title: 'usePopup',
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

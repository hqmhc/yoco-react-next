import React, { FC, HTMLAttributes }  from 'react';
import { Meta, Story } from '@storybook/react';

import { YocoCheckoutResult, Currency } from '../src/types';
import { usePopup } from '../src/hooks/usePopup';

interface Props extends HTMLAttributes<HTMLFormElement> {
  amountInCents: number;
  currency: Currency;
  publicKey: string;
  paymentId: string;
}

const Popup: FC<Props> = ({ amountInCents, currency, publicKey, paymentId}) => {
  const [showPopup, isYocoReady] = usePopup(publicKey, paymentId);

  async function callback(result: YocoCheckoutResult) {
    if (result.error) {
      alert(`❌ Error: [${result.error.status}] ${result.error.message}`);
      return;
    }
    alert(`✅ Success. ID: ${result.id}`)
  }

  async function onClose() {
    alert('⛔️ Pop Up Closed');
  }

  async function onSubmit() {
    showPopup({
      amountInCents,
      currency,
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
  amountInCents: 1000,
  currency: 'ZAR',
  paymentId: 'p_ogkY59Ge25PtO5AtQbIdO4L9',
  publicKey: 'pk_test_ed3c54a6gOol69qa7f45',
};

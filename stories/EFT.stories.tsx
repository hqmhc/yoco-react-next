import React, { FC, HTMLAttributes }  from 'react';
import { Meta, Story } from '@storybook/react';

import { useEFT } from '../src/hooks/useEFT';

interface Props extends HTMLAttributes<HTMLFormElement> {
  publicKey: string;
  paymentId: string;
}

const EFT: FC<Props> = ({ publicKey, paymentId}) => {
  const [showEFT, isYocoReady] = useEFT(publicKey);

  async function onSubmit() {
      try {
        const result = await showEFT({ id: paymentId });
        if (result.error) {
          alert(`❌ Error: [${result.error.status}] ${result.error.message}`);
          return;
        }
        if (result.status === 'cancelled') {
          alert('⛔️ Payment cancelled.');
          return;
        }
        alert(`✅ Success. ID: ${result.id}`)
      } catch (err) {
        alert(`❌ Error: ${err.message}`);
      }
  }

  return (
    <button disabled={!isYocoReady} onClick={onSubmit}>Pay</button>
  );
}

const meta: Meta = {
  title: 'useEFT',
  component: EFT,
  argTypes: {
    publicKey: {
      description: 'Yoco merchant public key.',
      control: {
        type: 'text',
      },
    },
    paymentId: {
      description: 'Yoco payment ID.',
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

const Template: Story<Props> = args => <EFT {...args} />;

export const Default = Template.bind({});

Default.args = {
  amountInCents: 200,
  currency: 'ZAR',
  paymentId: '',
  publicKey: '',
};

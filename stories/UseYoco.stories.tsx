import React, { FC, HTMLAttributes } from 'react';
import { Meta, Story } from '@storybook/react';

import { YocoCheckoutResult } from '../src/types';
import { usePopup } from '../src/hooks/usePopup';

interface Props extends HTMLAttributes<HTMLFormElement> {
  publicKey: string;
  paymentId: string;
}

const Popup: FC<Props> = ({ publicKey, paymentId }) => {
  const [showPopup, isYocoReady] = usePopup(publicKey, paymentId);

  async function callback(res: YocoCheckoutResult) {
    alert('callback!');
    console.log({ res });
  }

  async function onClose() {
    alert('"onClose" callback invoked.');
  }

  async function onSubmit() {
    showPopup({
      callback,
      onClose,
    });
  }

  return (
    <button disabled={!isYocoReady} onClick={onSubmit}>
      Pay
    </button>
  );
};

const meta: Meta = {
  title: 'useYoco',
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

const Template: Story<Props> = (args) => <Popup {...args} />;

export const Default = Template.bind({});

Default.args = {
  publicKey: 'pk_test_ed3c54a6gOol69qa7f45',
  paymentId: 'p_ogkY59Ge25PtO5AtQbIdO4L9',
};

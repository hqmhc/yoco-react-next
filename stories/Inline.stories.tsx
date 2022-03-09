import React, { FC, HTMLAttributes, useEffect } from 'react';
import { Meta, Story } from '@storybook/react';

import { useInline } from '../src/hooks/useInline';
import { InlineForm } from '../src/InlineForm';

interface Props extends HTMLAttributes<HTMLFormElement> {
  publicKey: string;
  paymentId: string;
  showErrors: boolean;
  showSubmitButton: boolean;
  submitButtonText: string;
}

const Inline: FC<Props> = ({
  publicKey,
  paymentId,
  showErrors,
  showSubmitButton,
  submitButtonText
}) => {
  const [inline, isValid, validationErrorMessage] = useInline(
    publicKey,
    {
      layout: 'plain',
      showErrors,
      showSubmitButton,
      submitButtonText,
    }
  );

  useEffect(() => {
    console.log({ isValid, validationErrorMessage });
  }, [isValid, validationErrorMessage]);

  useEffect(() => {
    if (!inline) {
      return;
    }
    inline.mount("#card-frame");
  }, [inline]);

  async function onSubmit() {
    if (!isValid || !inline) {
      return;
    }
    try {
      const result = await inline.submit({
        id: paymentId
      });
      console.log(result);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <InlineForm
      onSubmit={onSubmit}
    >
      {!showErrors && (<p className="error-message">{validationErrorMessage}</p>)}
    </InlineForm>
  );
}

const meta: Meta = {
  title: 'useInline',
  component: Inline,
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

const Template: Story<Props> = args => <Inline {...args} />;

export const Default = Template.bind({});

Default.args = {
  publicKey: 'pk_test_ed3c54a6gOol69qa7f45',
  paymentId: 'p_ogkY59Ge25PtO5AtQbIdO4L9',
  showErrors: true,
  showSubmitButton: true,
  submitButtonText: 'Pay R20'
};

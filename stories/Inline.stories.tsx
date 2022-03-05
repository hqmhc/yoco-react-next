import React, { FC, HTMLAttributes, useEffect } from 'react';
import { Meta, Story } from '@storybook/react';

import { useInlineSDK } from '../src/hooks/useInlineSDK';
import { InlineForm } from '../src/InlineForm';

/* todo
 https://deploy-preview-38--modest-shannon-b4f7f0.netlify.app/online/inline/reference/
*/

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
  const [inlineSDK, isValid, validationErrorMessage] = useInlineSDK(
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
    if (!inlineSDK) {
      return;
    }
    inlineSDK.mount("#card-frame");
  }, [inlineSDK]);

  async function onSubmit() {
    if (!isValid || !inlineSDK) {
      return;
    }
    try {
      const result = await inlineSDK.submit({
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
  title: 'useInlineSDK',
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
  publicKey: 'pk_test_68b64fa8qRzN52Xe2234',
  paymentId: 'p_pLpJGWOoJ2BflwVf61cdk0gZ',
  showErrors: true,
  showSubmitButton: true,
  submitButtonText: 'Pay R20'
};

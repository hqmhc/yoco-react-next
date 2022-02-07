import React, { FC, HTMLAttributes, ReactChild } from 'react';

export interface Props extends HTMLAttributes<HTMLFormElement> {
  children?: ReactChild;
  isValid: boolean;
  onSubmit: () => void;
  title: string;
}

export const InlineForm: FC<Props> = ({
  children,
  isValid,
  onSubmit,
  title,
  ...rest
}) => {
  return (
    <form
      id="payment-form"
      onSubmit={(event) => { event.preventDefault(); onSubmit() }}
      {...rest}
    >
      <div className="one-liner">
        <div id="card-frame" className="card-frame"></div>
        <button id="pay-button" disabled={!isValid}>
            {title}
        </button>
      </div>
      {children}
    </form>
  )
}

import React, { FC, HTMLAttributes, ReactChild } from 'react';

export interface Props extends HTMLAttributes<HTMLFormElement> {
  children?: ReactChild;
  onSubmit: () => void;
}

export const InlineForm: FC<Props> = ({
  children,
  onSubmit,
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
      </div>
      {children}
    </form>
  )
}

import React from 'react';
import { render } from '@testing-library/react';
import { PopupTest } from '../src/components/PopupTest';

describe('usePopup Component', () => {
  it('renders without crashing', () => {
    render(
      <PopupTest
        publicKey="pk_test_68b64fa8qRzN52Xe2234"
        paymentId="p_pLpJGWOoJ2BflwVf61cdk0gZ"
      />
    );
  });
});

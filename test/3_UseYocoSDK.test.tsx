import React from 'react';
import { render } from '@testing-library/react';
import { SDKTest } from './components/SDKTest';

describe('usePopup Component', () => {
  it('renders without crashing', () => {
    render(
      <SDKTest
        publicKey="pk_test_68b64fa8qRzN52Xe2234"
        paymentId="p_pLpJGWOoJ2BflwVf61cdk0gZ"
      />
    );
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { BlackbirdTest } from '../src/components/BlackbirdTest';

describe('usePopup Component', () => {
  it('renders without crashing', () => {
    render(
      <BlackbirdTest
        publicKey="pk_test_68b64fa8qRzN52Xe2234"
        paymentId="p_pLpJGWOoJ2BflwVf61cdk0gZ"
      />
    );
  });
});

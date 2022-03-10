import React from 'react';
import { render } from '@testing-library/react';
import { EFTTest } from './components/EFTTest';

describe('useEFT Component', () => {
  it('renders without crashing', () => {
    render(
      <EFTTest
        publicKey="pk_test_ed3c54a6gOol69qa7f45"
        paymentId="p_ogkY59Ge25PtO5AtQbIdO4L9"
      />
    );
  });
});

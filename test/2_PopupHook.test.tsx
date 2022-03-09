import React from 'react';
import { render } from '@testing-library/react';
import { PopupTest } from './components/PopupTest';

describe('usePopup Component', () => {
  it('renders without crashing', () => {
    render(
      <PopupTest
        publicKey="pk_test_ed3c54a6gOol69qa7f45"
        paymentId="p_ogkY59Ge25PtO5AtQbIdO4L9"
      />
    );
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { InlineForm } from '../src/InlineForm';

describe('InlineForm Component', () => {
  it('renders without crashing', () => {
    render(<InlineForm onSubmit={() => {}} />);
  });
});

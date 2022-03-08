import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { InlineForm } from '../.';

const App = () => {
  return (
    <div>
      <InlineForm onSubmit={() => {}} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEFT, usePopup, useYoco } from '../.';

const App = () => {
  return (
    <div>
      <h2>Playground</h2>
      <p>
        You can use this Parcel playground to quickly test the hooks anc components.
      </p>
    </div>

  );
};

ReactDOM.render(<App />, document.getElementById('root'));

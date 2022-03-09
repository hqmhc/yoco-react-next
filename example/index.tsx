import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { usePopup } from '../.';

const App = () => {
  const [showPopup, isYocoReady] = usePopup('pk_test_ed3c54a6gOol69qa7f45', 'p_ogkY59Ge25PtO5AtQbIdO4L9');

  async function callback(result) {
    if (result.error) {
      // handle failure
      // result.error.message - Error message
      // result.error.status  - Error status
      alert(`❌ Error: ${result.error.message}`);
      return;
    }
    alert(`✅ Success. ID: ${result.id}`)
    // result.id has the payment's id for verification
  }

  async function onClose() {
    // handle pop up dismissal
    alert('⛔️ Pop Up Closed');
  }

  async function onSubmit() {
    showPopup({ amountInCents: 1000, currency: 'ZAR', callback, onClose });
  }

  return (
    <button disabled={!isYocoReady} onClick={onSubmit}>Pay</button>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

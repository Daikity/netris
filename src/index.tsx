import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './assets/scss/main.scss';
import App from './App';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { setupStore } from './store';

const clientQuery = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={setupStore}>
    <QueryClientProvider client={clientQuery}>
      <App />
    </QueryClientProvider>
  </Provider>,
);

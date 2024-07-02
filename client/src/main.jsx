import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx';
import { Provider } from 'react-redux';
import store from './redux/store/store.js';
import DataContextProvider from './context/DataContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <DataContextProvider>
    <AuthContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthContextProvider>
  </DataContextProvider>,
)

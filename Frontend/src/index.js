import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './hooks/useAuth'; // Đường dẫn đúng tới file này
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './components/Cart/CartContext'; // Đúng đường dẫn tới CartContext.js


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </CartProvider>
  </React.StrictMode>
);


reportWebVitals();

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { getProductById, getProductByKey, getProducts } from './api/Client';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}
// getProducts().then(products => console.log('че тут = ', products.body.results));
// getProductById('df049f34-bcf9-4833-8211-0ba5ddb9870e').then(product =>
//   console.log('по ИД = ', product),
// );
// getProductByKey('body-cream').then(product =>
//   console.log('по key = ', product),
// );

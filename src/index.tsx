import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="" element={<h1>your mum</h1>} />
        </Routes>
        </Layout>
    </BrowserRouter>
  </StrictMode>
);

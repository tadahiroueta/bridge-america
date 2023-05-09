import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Article from './components/Article';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/:term" element={<Article />} />
        </Routes>
        </Layout>
    </BrowserRouter>
  </StrictMode>
);

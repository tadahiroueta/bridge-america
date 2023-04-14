import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.scss';
import Layout from './components/Layout';
import Article from './components/Article';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route path=':id' element={<Article />} />
          <Route path='*' element={<Article id="404" />} />
        </Route>
      
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

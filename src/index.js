import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.scss';
import Layout from './components/Layout';
import Article from './components/Article';
import Write from './components/Write';
import Welcome from './components/Welcome';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route path='' element={<Welcome />} />
          <Route path='write' element={<Write />} />
          <Route path=':id' element={<Article />} />
          <Route path='*' element={<Article id="404" />} />
        </Route>
      
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

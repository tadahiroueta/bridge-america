import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.scss';
import Layout from './components/Layout';
import Article from './components/Article';
import FourOFour from './components/FourOFour';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>

          <Route path='article/:id' element={<Article />} />
          <Route path="*" element={<FourOFour />} />
        
        </Route>
      
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

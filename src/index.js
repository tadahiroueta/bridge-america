import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.scss';
import Article from './components/Article';
import FourOFour from './components/FourOFour';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path='/test' element={<h1>test</h1>} />
          <Route path='article/:id' element={<Article />} />
          
          <Route path="*" element={<FourOFour />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

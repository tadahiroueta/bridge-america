import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import Article from './Article';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Article name='lorem' />
  </StrictMode>
);

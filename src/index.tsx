import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <h1 className="text-3xl font-bold underline">something just like this</h1>
  </StrictMode>
);

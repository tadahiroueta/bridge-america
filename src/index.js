import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';

import Layout from './components/Layout';
import Welcome from './components/Welcome';
import About from './components/About';
import Article from './components/Article';
import Contribute from './components/Contribute';
import Submitted from './components/Submitted';
import Admin from './components/Admin';
import Review from './components/Review';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Layout>
      <Routes>

        <Route path="" element={ <Welcome /> } />
        <Route path="about" element={ <About /> } />
        <Route path="contribute" element={ <Contribute /> } />
        <Route path="admin" element={ <Admin /> } />

        <Route path=":term" element={ <Article /> } />
        <Route path="submitted/:term" element={ <Submitted /> } />
        <Route path='review/:term' element={ <Review /> } />

      </Routes>
    </Layout>
  </BrowserRouter>
);

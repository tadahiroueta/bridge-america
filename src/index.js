import { StrictMode } from "react";
import ReactDOM from "react-dom/client"; // client is more proper, apparently
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Write from "./pages/Write";
import Layout from "./pages/Layout";
import Article from "./pages/Article";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode> {/* avoid build errors */}
    <BrowserRouter>
      <Layout> {/* always on */}
        <Routes>

          <Route path="write" element={<Write />} />
          <Route path=":term" element={<Article />} />
          <Route path="" element={<Article />} />
        
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>
)
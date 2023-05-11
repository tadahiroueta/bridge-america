import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Article from "./components/Article";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/:term" element={<Article />} />
          <Route path="/" element={"404"} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>
)
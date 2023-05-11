import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./pages/Layout";
import Article from "./pages/Article";
import Skirmish from "./Skirmish";
import "./index.scss";
import Write from "./pages/Write";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>

          <Route path="write" element={<Write />} />
          <Route path="sub" element={<Skirmish />} />
          <Route path=":term" element={<Article />} />
          <Route path="" element={"404"} />
        
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>
)
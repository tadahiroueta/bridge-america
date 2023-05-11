import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Write from "./pages/Write";
import Layout from "./pages/Layout";
import Article from "./pages/Article";
import "./index.scss";
import Skirmish from "./Skirmish"; // TODO remove

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode> {/* avoid build errors */}
    <BrowserRouter>
      <Layout> {/* always on */}
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
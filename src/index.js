import { StrictMode } from "react";
import ReactDOM from "react-dom/client"; // client is more proper, apparently
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Write from "./pages/Write";
import Admin from "./pages/Admin";
import Layout from "./pages/Layout";
import Welcome from "./pages/Welcome";
import Article from "./pages/Article";
import Approve from "./pages/Approve";
import Skirmish from "./pages/Skirmish";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode> {/* avoid build errors */}
    <BrowserRouter>
      <Layout> {/* applied on all pages */}
        <Routes>

          <Route path="" element={ <Welcome /> } />
          <Route path="write" element={ <Write /> } />

          {/* unbeknown to the public */}
          <Route path="admin" element={ <Admin /> } /> 
          <Route path="skirmish" element={ <Skirmish /> } />
          <Route path="admin/:title" element={ <Approve /> } />
          
          <Route path=":title" element={ <Article /> } />
        
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>
)
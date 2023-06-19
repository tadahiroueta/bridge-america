import { StrictMode } from "react";
import ReactDOM from "react-dom/client"; // client is more proper, apparently
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Write from "./components/Write";
import Admin from "./components/Admin";
import Layout from "./components/Layout";
import Review from "./components/Review";
import Welcome from "./components/Welcome";
import Article from "./components/Article";
import Skirmish from "./components/Skirmish";
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
          <Route path="admin/:title" element={ <Review /> } />
          
          <Route path=":title" element={ <Article /> } />
        
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>
)
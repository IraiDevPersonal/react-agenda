import { Toaster } from "sonner";

import Layout from "@/layout";

import Router from "./router";
import "./config/styles/global.css";

function App() {
  return (
    <Layout>
      <Router />
      <Toaster />
    </Layout>
  );
}

export default App;

import { Toaster } from "sonner";

import Layout from "@/shared/layout";
import Router from "@/shared/router";

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

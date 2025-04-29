import { Toaster } from "sonner";

import RootLayout from "@/modules/_shared/layouts/root-layout";

import Router from "./router";
import "./config/styles/global.css";

function App() {
  return (
    <RootLayout>
      <Router />
      <Toaster />
    </RootLayout>
  );
}

export default App;

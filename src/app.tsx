import { Toaster } from "sonner";

import Router from "./router";
import "./config/styles/global.css";

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;

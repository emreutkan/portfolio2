import { lazy } from "react";
import "./App.css";
import Header from "./components/header/header";

const Experience = lazy(() => import("./features/experience/experience"));

function App() {
  return (
    <>
      <Header />
      <Experience />
    </>
  );
}

export default App;

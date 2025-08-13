import { lazy, Suspense } from "react";
import "./App.css";
import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Contact from "./components/contact/contact";

const Experience = lazy(() => import("./features/experience/experience"));
const Projects = lazy(() => import("./features/projects/projects"));

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <Experience />
        <Projects />
      </Suspense>
      <Contact />
    </>
  );
}

export default App;

import { lazy, Suspense } from "react";
import "./App.css";
import Contact from "./components/contact/contact";
import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Freshdeal from "./features/projects/freshdeal/freshdeal";

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
        <Freshdeal />
      </Suspense>
      <Contact />
    </>
  );
}

export default App;

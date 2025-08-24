import { lazy } from "react";
import Contact from "./components/contact/contact";
import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Freshdeal from "./features/projects/freshdeal/freshdeal";
import useLenis from "./hooks/useSmoothMomentumScroll";
const Experience = lazy(() => import("./features/experience/experience"));
const Projects = lazy(() => import("./features/projects/projects"));

function App() {
  useLenis();
  return (
    <div>
      <Header />
      <Hero />
      <Experience />
      <Projects />
      <Freshdeal />
      <Contact />
    </div>
  );
}

export default App;

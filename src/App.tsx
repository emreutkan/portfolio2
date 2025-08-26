import { lazy, useEffect } from "react";
import Contact from "./components/contact/contact";
import Hero from "./components/hero/hero";
import Freshdeal from "./features/projects/freshdeal/freshdeal";
import useLenis from "./hooks/useSmoothMomentumScroll";

import { initResponsiveScaling } from "./utils/responsiveUtils";

const Experience = lazy(() => import("./features/experience/experience"));
const Projects = lazy(() => import("./features/projects/projects"));

function App() {
  useLenis();

  // Initialize responsive scaling
  useEffect(() => {
    initResponsiveScaling();
  }, []);

  return (
    <div>
      <Hero />
      <Experience />
      <Projects />
      <Freshdeal />
      <Contact />
    </div>
  );
}

export default App;

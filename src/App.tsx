import { lazy, useEffect } from "react";
import Background from "./components/background/background";
import Contact from "./components/contact/contact";
import Footer from "./components/footer/footer";
import Hero from "./components/hero/hero";
import useLenis from "./hooks/useSmoothMomentumScroll";

import { initResponsiveScaling } from "./utils/responsiveUtils";

const Experience = lazy(() => import("./features/experience/experience"));
const Projects = lazy(() => import("./features/projects/projects"));

function App() {
  useLenis(); // now wires Lenis + scrollControls

  useEffect(() => {
    initResponsiveScaling();
  }, []);

  return (
    <div>
      <Background />
      <Hero />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

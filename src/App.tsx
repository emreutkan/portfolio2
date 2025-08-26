import { lazy, useEffect } from "react";
import Background from "./components/background/background";
import Contact from "./components/contact/contact";
import Hero from "./components/hero/hero";
import StackScroller from "./components/stack-scroller/stack-scroller";
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
      <Background />
      <Hero />
      <StackScroller>
        <Experience />
        <Projects />
        {/* Disable Freshdeal GSAP if stacking causes conflicts; can re-enable after testing */}
        <Freshdeal enableAnimation={false} />
        <Contact />
      </StackScroller>
    </div>
  );
}

export default App;

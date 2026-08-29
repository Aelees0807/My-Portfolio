import { AmbientMesh, GrainOverlay, Navbar } from './components';
import { Hero, Projects, About, Skills, Experience, Contact} from './sections';

/**
 * App — Root layout.
 * Composes background layers, navigation, and page sections.
 * All content is driven by /src/data/content.js.
 */
export default function App() {
  return (
    <>
      {/* ── Background layers (fixed, behind everything) ── */}
      <AmbientMesh />
      <GrainOverlay />

      {/* ── Navigation ── */}
      <Navbar />

      {/* ── Page sections ── */}
      <main className="relative z-10">
        <Hero />

        <hr className="divider container-wide" />
        <Projects />

        <hr className="divider container-wide" />
        <About />

        <hr className="divider container-wide" />
        <Skills />

        <hr className="divider container-wide" />
        <Experience />

        <hr className="divider container-wide" />
        <Contact />

        
      </main>
    </>
  );
}

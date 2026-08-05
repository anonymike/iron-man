import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { Navbar } from '@/components/ui/Navbar';
import { Hero } from '@/components/sections/Hero';
import { CinematicReveal } from '@/components/sections/CinematicReveal';
import { SynthSection } from '@/components/sections/SynthSection';
import { SystemsNominal } from '@/components/sections/SystemsNominal';
import { Footer } from '@/components/sections/Footer';

function App() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-full bg-background text-foreground grain">
        <Navbar />
        <main>
          <Hero />
          <CinematicReveal />
          <SynthSection />
          <SystemsNominal />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}

export default App;

import { useCallback, useState } from "react";
import { musicBox } from "./music";
import { useScrollLock } from "./hooks";
import { Cover, MusicButton, NavBar, Petals } from "./components/Chrome";
import { Hero, MarqueeStrip } from "./components/Hero";
import { CoupleSection, QuoteSection } from "./components/Intro";
import { CountdownSection, EventsSection } from "./components/EventDetails";
import { GallerySection, StorySection } from "./components/Moments";
import { Footer, GiftSection, RsvpSection } from "./components/Closing";

export default function App() {
  const [coverOpen, setCoverOpen] = useState(false);
  const [coverGone, setCoverGone] = useState(false);
  const [playing, setPlaying] = useState(false);

  useScrollLock(!coverGone);

  const openInvitation = useCallback(() => {
    setCoverOpen(true);
    musicBox.start();
    setPlaying(true);
    window.setTimeout(() => setCoverGone(true), 1150);
  }, []);

  const toggleMusic = useCallback(() => {
    setPlaying(musicBox.toggle());
  }, []);

  return (
    <div className="grain relative min-h-screen bg-pine-950 font-body text-paper-50 antialiased">
      <Petals />

      <main className="relative z-10">
        <Hero />
        <MarqueeStrip />
        <QuoteSection />
        <CoupleSection />
        <EventsSection />
        <CountdownSection />
        <StorySection />
        <GallerySection />
        <GiftSection />
        <RsvpSection />
        <Footer />
      </main>

      <NavBar visible={coverGone} />
      <MusicButton visible={coverGone} playing={playing} onToggle={toggleMusic} />

      {!coverGone && <Cover open={coverOpen} onOpen={openInvitation} />}
    </div>
  );
}

import { useEffect, useState } from "react";
import Cover from "./components/Cover";
import Nav from "./components/Nav";
import { Petals } from "./components/Decor";
import Hero from "./components/sections/Hero";
import Couple from "./components/sections/Couple";
import Events from "./components/sections/Events";
import Story from "./components/sections/Story";
import Gallery from "./components/sections/Gallery";
import Gift from "./components/sections/Gift";
import Wishes from "./components/sections/Wishes";
import Closing from "./components/sections/Closing";

type Stage = "closed" | "opening" | "open";

export default function App() {
  const [stage, setStage] = useState<Stage>("closed");

  useEffect(() => {
    document.body.style.overflow = stage === "open" ? "" : "hidden";
  }, [stage]);

  const open = () => {
    if (stage !== "closed") return;
    setStage("opening");
    // Timer sengaja tidak dibersihkan oleh effect scroll-lock di atas,
    // agar transisi sampul → konten selalu selesai.
    window.setTimeout(() => setStage("open"), 1250);
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-pine-950 font-sans text-ivory">
      {/* cahaya ambient berlapis */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(55% 40% at 85% -5%, rgba(200,169,97,0.09), transparent 65%), radial-gradient(60% 45% at -10% 35%, rgba(32,71,52,0.5), transparent 60%), radial-gradient(70% 50% at 110% 80%, rgba(24,56,41,0.55), transparent 65%)",
        }}
      />

      <Petals />

      {stage !== "open" && <Cover opening={stage === "opening"} onOpen={open} />}

      <main
        className={`relative z-10 transition-opacity duration-1000 ${
          stage === "open" ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={stage !== "open"}
      >
        <Hero open={stage === "open"} />
        <Couple />
        <Events />
        <Story />
        <Gallery />
        <Gift />
        <Wishes />
        <Closing />
      </main>

      {stage === "open" && <Nav />}
    </div>
  );
}

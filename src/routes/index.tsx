import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import { Ambience } from "@/components/Ambience";
import { Envelope } from "@/components/Envelope";
import { burstConfetti, gentleHearts } from "@/lib/confetti";
import whatsappVideo from "@/assets/photos/WhatsApp Video 2026-07-02 at 12.53.12 PM.webm";
import heroVideo from "@/assets/photos/WhatsApp Video 2026-07-02 at 12.53.11 PM.webm";
import goofballPhoto from "@/assets/photos/WhatsApp Image 2026-07-02 at 12.56.33 PM.webp";
import usBeingUsPhoto from "@/assets/photos/WhatsApp Image 2026-07-02 at 12.56.33 PM (1).webp";
import mainCharacterPhoto from "@/assets/photos/WhatsApp Image 2026-07-03 at 4.45.25 AM (1).webp";
import heroPoster from "@/assets/photos/hero_poster.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday Koli ❤️" },
      { name: "description", content: "A magical birthday surprise, made just for you." },
      { property: "og:title", content: "Happy Birthday Koli ❤️" },
      { property: "og:description", content: "A magical birthday surprise, made just for you." },
      { property: "og:image", content: heroPoster },
      { name: "twitter:image", content: heroPoster },
    ],
  }),
  component: Journey,
});

type Stage = "intro" | "reveal" | "promise" | "story";

function Journey() {
  const [stage, setStage] = useState<Stage>("intro");
  const [opened, setOpened] = useState(false);
  const [promised, setPromised] = useState(false);

  const openGift = () => {
    if (opened) return;
    setOpened(true);
    burstConfetti();
    setTimeout(() => setStage("reveal"), 1400);
  };

  const goPromise = () => {
    gentleHearts();
    setStage("promise");
  };

  const onYes = () => {
    setPromised(true);
    burstConfetti();
    setStage("story");
    setTimeout(() => {
      document.getElementById("hero-birthday")?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Ambience />

      <AnimatePresence mode="wait">
        {stage === "intro" && <IntroScreen key="intro" opened={opened} onOpen={openGift} />}
        {stage === "reveal" && <RevealScreen key="reveal" onContinue={goPromise} />}
        {stage === "promise" && <PromiseScreen key="promise" onYes={onYes} />}
      </AnimatePresence>

      {promised && <StoryFlow />}
    </main>
  );
}

function ScreenShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center"
    >
      {children}
    </motion.section>
  );
}

function IntroScreen({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  return (
    <ScreenShell>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-3 font-[var(--font-hand)] text-2xl text-[oklch(0.55_0.15_12)] sm:text-3xl"
      >
        a little something for you...
      </motion.p>
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        className="text-glow font-[var(--font-display)] text-5xl font-bold leading-tight text-[oklch(0.35_0.1_15)] sm:text-6xl md:text-7xl"
      >
        Happy Birthday <br />
        <span className="italic text-[oklch(0.55_0.18_12)]">Koli</span>{" "}
        <span className="text-[oklch(0.65_0.2_15)]">❤</span>
      </motion.h1>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.9 }}
        className="mt-12 gentle-float"
      >
        <Envelope opened={opened} onClick={onOpen} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 0 : 1 }}
        transition={{ delay: 1.4 }}
        className="mt-10 max-w-xs font-[var(--font-hand)] text-2xl text-[oklch(0.5_0.14_15)]"
      >
        Press here for your magical birthday gift ✨
      </motion.p>
    </ScreenShell>
  );
}

function RevealScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <ScreenShell>
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="glass rounded-[2rem] p-10 sm:p-14"
      >
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-[var(--font-hand)] text-3xl text-[oklch(0.55_0.15_12)]"
        >
          tika muchkond
        </motion.p>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 font-[var(--font-display)] text-4xl font-bold text-[oklch(0.35_0.1_15)] sm:text-5xl"
        >
          click madu bevarsi
        </motion.h2>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="pulse-glow mt-10 rounded-full bg-gradient-to-r from-[oklch(0.78_0.16_12)] to-[oklch(0.68_0.2_10)] px-10 py-4 font-[var(--font-sans)] text-lg font-semibold text-white shadow-lg"
        >
          Click Here ❤
        </motion.button>
      </motion.div>
    </ScreenShell>
  );
}

function PromiseScreen({ onYes }: { onYes: () => void }) {
  const [attempts, setAttempts] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const noMessages = [
    "NO 🙄",
    "Nope 😂",
    "Wrong choice.",
    "Still trying?",
    "You seriously thought I'd let you press this? 😂",
  ];
  const label = noMessages[Math.min(attempts, noMessages.length - 1)];

  const runAway = () => {
    const box = containerRef.current?.getBoundingClientRect();
    const range = box ? Math.min(box.width, 320) / 2 : 140;
    const x = (Math.random() - 0.5) * range * 2;
    const y = (Math.random() - 0.5) * 200;
    setNoPos({ x, y });
    const next = attempts + 1;
    setAttempts(next);
    if (next >= 4) setShowPopup(true);
  };

  return (
    <ScreenShell>
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-[var(--font-display)] text-4xl font-bold text-[oklch(0.35_0.1_15)] sm:text-5xl"
      >
        Promise Me One Thing ❤
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 max-w-md font-[var(--font-hand)] text-2xl text-[oklch(0.45_0.12_15)] sm:text-3xl"
      >
        Promise me you'll find a girlfriend for me someday. Can you promise? 🥹
      </motion.p>

      <div
        ref={containerRef}
        className="relative mt-12 flex h-56 w-full max-w-md items-center justify-center gap-6"
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={onYes}
          className="pulse-glow rounded-full bg-gradient-to-r from-[oklch(0.78_0.18_12)] to-[oklch(0.62_0.22_10)] px-10 py-4 text-lg font-bold text-white shadow-xl"
        >
          YES ❤
        </motion.button>

        <motion.button
          animate={{ x: noPos.x, y: noPos.y, rotate: noPos.x * 0.2 }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
          onMouseEnter={runAway}
          onTouchStart={() => {
            runAway();
          }}
          onClick={(e) => {
            e.preventDefault();
            runAway();
          }}
          className="rounded-full border-2 border-[oklch(0.72_0.14_15)] bg-white/70 px-8 py-4 text-lg font-semibold text-[oklch(0.5_0.14_15)] backdrop-blur touch-none"
        >
          {label}
        </motion.button>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[oklch(0.3_0.1_15/0.4)] px-6 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.7, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8 }}
              className="glass max-w-sm rounded-3xl p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-5xl">😂❤</div>
              <p className="mt-4 font-[var(--font-display)] text-2xl font-bold text-[oklch(0.35_0.1_15)]">
                Shut up and press YES.
              </p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/20 shadow-inner">
                <video
                  src={whatsappVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="mt-4 font-[var(--font-hand)] text-xl text-[oklch(0.5_0.14_15)]">
                Be a responsible person and find a girlfriend for me. 😂❤
              </p>
              <button
                onClick={() => {
                  setShowPopup(false);
                  onYes();
                }}
                className="mt-6 rounded-full bg-gradient-to-r from-[oklch(0.78_0.18_12)] to-[oklch(0.62_0.22_10)] px-8 py-3 font-semibold text-white shadow-lg"
              >
                Okay, YES ❤
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenShell>
  );
}

/* ---------- Story flow ---------- */

function StoryFlow() {
  return (
    <div className="relative z-10">
      <HeroBirthday />
      <LetterSection />
      <EndingSection />
    </div>
  );
}

function ShiningParticles({ count = 35 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        size: 1 + Math.random() * 2.5, // 1px to 3.5px
        opacity: 0.4 + Math.random() * 0.6,
      })),
    [count],
  );

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <span
          key={p.id}
          className="twinkle absolute rounded-full bg-white"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            opacity: p.opacity,
            boxShadow: "0 0 4px rgba(255,255,255,0.8), 0 0 8px oklch(0.85 0.14 15 / 0.6)",
          }}
        />
      ))}
    </div>
  );
}

function HeroBirthday() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 80]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  return (
    <section
      id="hero-birthday"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.video
        src={heroVideo}
        poster={heroPoster}
        autoPlay
        loop
        muted
        playsInline
        style={{ y, scale, willChange: "transform" }}
        className="absolute inset-0 h-full w-full object-cover mobile-no-parallax"
      />
      <div className="absolute inset-0 bg-pink-500/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.9_0.08_15/0.6)] via-[oklch(0.85_0.1_10/0.75)] to-[oklch(0.75_0.14_12/0.95)]" />
      <ShiningParticles />
      <div className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-[var(--font-hand)] text-2xl text-white/95 text-glow sm:text-3xl"
        >
          the world got softer the day you were born
        </motion.p>
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-glow mt-4 font-[var(--font-display)] text-5xl font-bold text-white sm:text-6xl md:text-7xl"
        >
          Happy Birthday <br />
          <span className="italic">Chintu</span> ❤
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-6 font-[var(--font-sans)] text-lg text-white/90 sm:text-xl"
        >
          It's all about celebrating you today.
        </motion.p>
      </div>
    </section>
  );
}

const LETTER_PARAS = [
  "To the person who saved my life without even knowing it,",
  "Happy Birthday, Koli. ❤",
  "You've been so many things in my life - a really good friend, a sister, a mother whenever I needed one, and honestly... even more caring than my girlfriend ever was. And yes, an annoying piece of shit who laughs at my problems first and then silently helps me heal.",
  "Trust me, I really mean it when I say words aren't enough to describe what you are to me. You may call me your friend, but for me, you're much more than that.",
  "If I count the people who truly matter in my life, I'd still have fingers left. One middle finger is reserved for you because you're so damn annoying, and the other one is permanently booked for my ex-girlfriend. 😂",
  "Honestly, I hope our bond always stays like this. We know each other so well without needing to meet every day. Somewhere I feel that if we met too often, thoda attachment kam ho jayega. What we have right now is rare, genuine, and I never want to lose it.",
  "I don't know how life works. I've lost a lot of people who had been in my life for years. I don't know how many days, months, or years we'll have together, but trust me, even if I'm just a temporary person in your life, I want to be the best temporary person you'll ever have.",
  "You're that beautiful flower in a garden that should never be picked. You deserve to stay exactly where you are, spreading happiness to everyone around you. Some things are too beautiful to be owned - they're simply meant to exist, and you're one of them.",
  "You have a place in my heart that nobody can replace.",
  "You're like that one song I pretend to hate but secretly play on repeat. You annoy me, tease me, argue with me, and somehow still manage to be one of the biggest reasons I smile. You're the chaos in my calm, but also the calm in my chaos.",
  "Thank you for coming into my life when I needed someone the most. You healed parts of me that I never even told you were broken. I don't think you'll ever realize how much you've done for me, but I'll always be grateful for it.",
  "And yes, before you start complaining, I haven't forgotten. I will get you your biryani and shawarma - that's a promise. Consider it your official birthday treat. 😂❤",
  "Stay exactly the way you are - kind, caring, irritating, and absolutely irreplaceable.",
  "Happy Birthday once again, idiot. I love you a lot, and I'm lucky to have you in my life. ❤",
];

function PhotoCard({ src, alt, tilt }: { src: string; alt: string; tilt: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9 }}
      className="glass overflow-hidden rounded-[1.5rem] p-3 shadow-xl"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-72 w-full rounded-[1rem] object-cover sm:h-96"
      />
      <p className="mt-3 text-center font-[var(--font-hand)] text-xl text-[oklch(0.5_0.14_15)]">
        {alt}
      </p>
    </motion.div>
  );
}

function LetterSection() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-[var(--font-display)] text-4xl font-bold text-[oklch(0.35_0.1_15)] sm:text-5xl"
        >
          A little letter, from me to you
        </motion.h3>
        <p className="mx-auto mt-3 max-w-xl text-center font-[var(--font-hand)] text-2xl text-[oklch(0.55_0.15_12)]">
          words I've been meaning to say ✿
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.4fr_1fr] lg:items-center">
          <div className="hidden lg:block">
            <PhotoCard src={goofballPhoto} alt="my favourite goofball" tilt={-3} />
          </div>

          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9 }}
            className="glass relative rounded-[2rem] p-8 sm:p-12"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 36px, oklch(0.85 0.05 20 / 0.35) 36px, oklch(0.85 0.05 20 / 0.35) 37px)",
            }}
          >
            <div className="absolute -top-4 left-1/2 h-8 w-24 -translate-x-1/2 rounded-md bg-[oklch(0.85_0.1_15/0.6)] backdrop-blur-sm" />
            <div className="space-y-5 font-[var(--font-hand)] text-xl leading-relaxed text-[oklch(0.35_0.08_15)] sm:text-2xl sm:leading-relaxed">
              {LETTER_PARAS.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, delay: 0.05 }}
                  className={
                    i === 1
                      ? "text-center font-[var(--font-display)] text-3xl font-bold text-[oklch(0.5_0.18_12)] sm:text-4xl"
                      : ""
                  }
                >
                  {p}
                </motion.p>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="pt-4 text-right font-[var(--font-display)] italic text-[oklch(0.5_0.14_15)]"
              >
                - always, HARSHITH
              </motion.p>
            </div>
          </motion.article>

          <div className="lg:hidden">
            <div className="grid grid-cols-2 gap-4">
              <PhotoCard src={goofballPhoto} alt="goofball" tilt={-3} />
              <PhotoCard src={usBeingUsPhoto} alt="us being us" tilt={3} />
            </div>
          </div>

          <div className="hidden lg:block">
            <PhotoCard src={usBeingUsPhoto} alt="us being us" tilt={3} />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:hidden">
          <PhotoCard src={mainCharacterPhoto} alt="main character energy" tilt={2} />
        </div>
      </div>
    </section>
  );
}

function EndingSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          gentleHearts();
          setTimeout(gentleHearts, 800);
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
    >
      <img
        src={mainCharacterPhoto}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.95_0.05_20/0.85)] via-[oklch(0.9_0.09_15/0.85)] to-[oklch(0.85_0.12_10/0.95)]" />

      <div className="relative z-10 max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-glow font-[var(--font-display)] text-5xl font-bold text-[oklch(0.3_0.1_15)] sm:text-6xl md:text-7xl"
        >
          Thank You For Existing ❤
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-8 font-[var(--font-hand)] text-2xl text-[oklch(0.4_0.1_15)] sm:text-3xl"
        >
          "Some people enter our lives and quietly change everything. You're one of them."
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-10 font-[var(--font-display)] text-2xl italic text-[oklch(0.5_0.15_12)]"
        >
          Forever grateful for you.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-8 font-[var(--font-hand)] text-2xl leading-relaxed text-[oklch(0.4_0.1_15)] sm:text-3xl"
        >
          If God gave me the chance to choose a girl, I would still look for someone with the exact
          same character as yours.
          <br />
          Lots of love and happiness.
          <br />
          Stay blessed, stay safe. You are a truly wonderful and cute person—stay exactly the way
          you are!
        </motion.p>
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3 }}
          className="text-glow mt-8 font-[var(--font-display)] text-3xl font-bold text-[oklch(0.35_0.15_12)] sm:text-4xl"
        >
          Happy Birthday once again, Koli. ❤
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8 }}
          className="mt-16 flex justify-center gap-2 text-3xl"
        >
          {["❤", "✿", "❤", "✿", "❤"].map((c, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              className="text-[oklch(0.65_0.2_12)]"
            >
              {c}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

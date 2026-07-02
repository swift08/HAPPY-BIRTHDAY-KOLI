import { motion } from "framer-motion";

export function Envelope({ opened, onClick }: { opened: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={opened}
      aria-label="Open your birthday gift"
      className="group relative mx-auto block h-56 w-72 sm:h-64 sm:w-80 focus:outline-none"
    >
      <div className="pulse-glow absolute inset-0 rounded-[2rem]" />
      {/* body */}
      <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-[oklch(0.95_0.05_20)] to-[oklch(0.85_0.11_12)] shadow-[var(--shadow-soft)]" />
      {/* bottom triangle */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 rounded-b-[1.5rem]"
        style={{
          background:
            "linear-gradient(to bottom right, oklch(0.9 0.08 15) 50%, transparent 50%), linear-gradient(to bottom left, oklch(0.9 0.08 15) 50%, transparent 50%)",
          backgroundSize: "50% 100%, 50% 100%",
          backgroundPosition: "left, right",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* seal / heart */}
      <motion.div
        initial={false}
        animate={opened ? { scale: [1, 1.6, 0], opacity: [1, 1, 0] } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute left-1/2 top-[58%] z-20 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.72_0.18_12)] text-2xl text-white shadow-lg">
          ❤
        </div>
      </motion.div>
      {/* flap */}
      <motion.div
        initial={false}
        animate={opened ? { rotateX: 180 } : { rotateX: 0 }}
        transition={{ duration: 1.2, ease: [0.6, 0.05, 0.2, 1] }}
        style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
        className="absolute inset-x-0 top-0 z-10 h-1/2 origin-top"
      >
        <div
          className="h-full w-full rounded-t-[1.5rem]"
          style={{
            background:
              "linear-gradient(to bottom right, oklch(0.92 0.07 15) 50%, transparent 50%), linear-gradient(to bottom left, oklch(0.92 0.07 15) 50%, transparent 50%)",
            backgroundSize: "50% 100%, 50% 100%",
            backgroundPosition: "left, right",
            backgroundRepeat: "no-repeat",
            transform: "rotate(180deg)",
            filter: "brightness(1.05)",
          }}
        />
      </motion.div>
      {/* letter peek */}
      <motion.div
        initial={false}
        animate={opened ? { y: -60, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.9 }}
        className="absolute inset-x-6 top-6 z-0 h-32 rounded-lg bg-white/95 p-3 text-center font-[var(--font-hand)] text-[oklch(0.55_0.15_12)] shadow"
      >
        <p className="text-sm">To my Koli ❤</p>
        <p className="mt-1 text-lg">Happy Birthday!</p>
      </motion.div>
    </button>
  );
}

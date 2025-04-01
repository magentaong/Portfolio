import { motion } from "framer-motion"
import Image from "next/image"

export default function CuteGifLoader() {
  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        <Image
          src="/images/cat-loader.giff"
          alt="Cat Typing"
          width={80}
          height={80}
          className="rounded-full shadow-md"
        />
      </motion.div>
      <p className="text-muted-foreground text-sm italic">sending meows...</p>
    </div>
  )
}

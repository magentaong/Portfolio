"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { usePointerCompanion } from "@/components/shared/PointerCompanion"

export default function FishCursor() {
  const { active, config } = usePointerCompanion()
  const fishRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const pendingPosRef = useRef({ x: -100, y: -100 })
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active) return

    const draw = () => {
      const fish = fishRef.current
      if (!fish) return

      const next = pendingPosRef.current
      const facingLeft = next.x < posRef.current.x

      posRef.current = next
      fish.style.opacity = "1"
      fish.style.transform = `translate3d(${next.x}px, ${next.y}px, 0) translate(-50%, -50%) scaleX(${facingLeft ? -1 : 1})`
      frameRef.current = null
    }

    const handleMouseMove = (event: MouseEvent) => {
      pendingPosRef.current = { x: event.clientX, y: event.clientY }
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(draw)
      }
    }

    const hide = () => {
      if (fishRef.current) fishRef.current.style.opacity = "0"
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.documentElement.addEventListener("mouseleave", hide)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.documentElement.removeEventListener("mouseleave", hide)
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }
  }, [active])

  if (!active) return null

  return (
    <div
      ref={fishRef}
      aria-hidden="true"
      className="pointer-events-none fixed z-40 select-none"
      style={{
        left: 0,
        top: 0,
        opacity: 0,
        transform: "translate3d(-100px, -100px, 0)",
        imageRendering: "pixelated",
        willChange: "opacity, transform",
        width: 32,
        height: 32,
      }}
    >
      <Image
        src={config.fishSrc}
        alt=""
        width={32}
        height={32}
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  )
}
